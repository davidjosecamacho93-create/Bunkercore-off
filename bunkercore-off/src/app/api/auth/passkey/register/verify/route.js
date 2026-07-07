import { verifyPasskeyRegistration } from '@/lib/passkey-utils';
import { prisma } from '@/lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    const { credential, challengeId, userId } = body;

    if (!credential || !challengeId || !userId) {
      return Response.json(
        { error: 'Credencial, challengeId y userId son requeridos' },
        { status: 400 }
      );
    }

    // Obtener el challenge almacenado
    const challenge = await prisma.authenticationChallenge.findUnique({
      where: { id: challengeId },
    });

    if (!challenge || challenge.used) {
      return Response.json(
        { error: 'Challenge inválido o ya utilizado' },
        { status: 400 }
      );
    }

    if (challenge.expiresAt < new Date()) {
      return Response.json(
        { error: 'Challenge expirado' },
        { status: 400 }
      );
    }

    // Convertir challenge hex de vuelta a buffer
    const expectedChallenge = Buffer.from(challenge.challenge, 'hex');

    // Verificar la credencial
    const verification = await verifyPasskeyRegistration(
      credential,
      expectedChallenge
    );

    if (!verification.success) {
      return Response.json(
        { error: verification.error || 'Verificación fallida' },
        { status: 400 }
      );
    }

    // Marcar challenge como usado
    await prisma.authenticationChallenge.update({
      where: { id: challengeId },
      data: { used: true },
    });

    // Guardar la credencial en la base de datos
    const passkeyCredential = await prisma.passkeyCredential.create({
      data: {
        userId,
        credentialId: verification.credentialId,
        publicKey: verification.publicKey,
        counter: verification.counter,
        deviceType: verification.credentialDeviceType,
        deviceBacked: verification.credentialBackedUp,
        name: `Dispositivo - ${new Date().toLocaleDateString()}`,
      },
    });

    return Response.json(
      {
        success: true,
        message: 'Passkey registrado exitosamente',
        credentialId: passkeyCredential.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error verificando registro de Passkey:', error);
    return Response.json(
      { error: error.message || 'Error verificando credencial' },
      { status: 500 }
    );
  }
}
