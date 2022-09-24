export class ChallengeInProgressError extends Error {
  constructor(public message: string, public challengeId: string, public expiration: Date) {
    super(message);
  }
}
