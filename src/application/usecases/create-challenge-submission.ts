import { Submission } from "../../domain/entities/submission";
import { ChallengesRepository } from "../repositories/ChallengesRepository";
import { StudentsRepository } from "../repositories/StudentsRepository";

type CreateChallengeSubmissionDTO = {
  studentId: string;
  challengeId: string;
}
export class CreateChallengeSubmission {
  constructor(
    private studentRepository: StudentsRepository,
    private challengesRepository: ChallengesRepository,
  ) { }
  async execute({ studentId, challengeId }: CreateChallengeSubmissionDTO) {
    const student = await this.studentRepository.findById(studentId)
    if (!student) {
      throw new Error('student not found')
    }

    const challenge = await this.challengesRepository.findById(challengeId)
    if (!challenge) {
      throw new Error('challenge not found')
    }

    const submission = Submission.create({
      studentId,
      challengeId,
    })
    return submission;
  }
}