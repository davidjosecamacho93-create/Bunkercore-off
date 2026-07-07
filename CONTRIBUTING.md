Contributing to Bunkercore

Thank you for your interest in contributing to Bunkercore.

Bunkercore is built around security, privacy, scalability, and maintainability. Every contribution should help preserve these principles.

Core Principles

- Security by Design
- Privacy by Design
- Zero-Knowledge Architecture
- Clean and maintainable code
- Modular development
- Comprehensive documentation
- Respectful collaboration

---

Code of Conduct

Contributors are expected to:

- Be respectful.
- Keep discussions constructive.
- Accept technical feedback.
- Prioritize the project's quality over personal preferences.
- Report security issues responsibly.

---

Development Workflow

The recommended workflow is:

1. Fork the repository.
2. Create a feature branch.
3. Implement the feature or fix.
4. Write or update tests when applicable.
5. Update documentation if necessary.
6. Submit a Pull Request.

Example:

git checkout -b feature/new-module

---

Project Structure

android/
backend/
database/
docs/
infrastructure/
labs/
scripts/
web-admin/

Every contribution should remain inside its corresponding module.

---

Coding Standards

General guidelines:

- Write readable code.
- Prefer clarity over cleverness.
- Keep functions focused on a single responsibility.
- Avoid unnecessary complexity.
- Document exported functions.
- Remove unused code before submitting.

---

Security Requirements

Security is not optional.

Contributors must never:

- Commit secrets.
- Commit API keys.
- Commit passwords.
- Commit private certificates.
- Commit private encryption keys.
- Disable security checks without discussion.

All sensitive configuration must be loaded through environment variables or secure secret management.

---

Cryptography

Any change involving encryption, authentication, key management, or security-sensitive logic should include:

- Documentation.
- Design explanation.
- Security justification.
- Tests covering expected behavior.

Security-related Pull Requests may require additional review.

---

Testing

Before opening a Pull Request:

- Ensure the project builds successfully.
- Run all available tests.
- Verify that no existing functionality is broken.

---

Documentation

Documentation is considered part of the project.

If your contribution changes behavior, architecture, configuration, or APIs, update the corresponding documentation.

Relevant documentation may include:

- README
- API documentation
- Architecture documentation
- Configuration guides

---

Commit Messages

Use descriptive commit messages.

Examples:

feat(auth): add passkey registration

fix(api): validate request payload

docs: update backend architecture

refactor(storage): simplify repository layer

---

Pull Requests

A good Pull Request should include:

- Clear description.
- Reason for the change.
- Testing performed.
- Documentation updates, if applicable.

Small and focused Pull Requests are preferred over large unrelated changes.

---

Reporting Bugs

Bug reports should include:

- Expected behavior.
- Actual behavior.
- Steps to reproduce.
- Environment information.
- Relevant logs.

---

Feature Requests

When proposing a feature, explain:

- The problem it solves.
- The proposed solution.
- Possible alternatives.
- Potential impact on the architecture.

---

Security Reports

Do not disclose security vulnerabilities publicly before they are addressed.

If you discover a security issue, contact the project maintainers privately with enough detail to reproduce and assess the problem.

---

License

By contributing to Bunkercore, you agree that your contributions will be licensed under the same license as the project.

Thank you for helping build a secure, scalable, and privacy-focused platform.
