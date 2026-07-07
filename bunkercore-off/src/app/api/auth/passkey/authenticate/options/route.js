import { generatePasskeyAuthenticationOptions } from '@/lib/passkey-utils';
import { prisma } from '@/lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return Response.json(
        { error: 'Email es requerido' },
        { status: 400 }
      );
    }

    // Buscar usuario por email
    const user = await prisma.user.findUnique({
      where: { email },
      include: { credentials: true },
    });

    if (!user || user.credentials.length === 0) {
      return Response.json(
        { error: 'Usuario o Passkey no encontrado' },
        { status: 404 }
      );
    }

    // Generar opciones de autenticación con las credenciales del usuario
    const authenticationOptions = await generatePasskeyAuthenticationOptions(
      user.credentials
    );

    // Guardar challenge en base de datos para verificación posterior
    const challenge = await prisma.authenticationChallenge.create({
      data: {
        challenge: Buffer.from(authenticationOptions.challenge, 'base64').toString('hex'),
        userId: user.id,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutos
      },
    });

    // Retornar opciones al cliente
    return Response.json(
      {
        options: authenticationOptions,
        challengeId: challenge.id,
        userId: user.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en autenticación de opciones:', error);
    return Response.json(
      { error: error.message || 'Error generando opciones de autenticación' },
      { status: 500 }
    );
  }
}
