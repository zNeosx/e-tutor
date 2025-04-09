// import { updateInstructoreAccountSettingsSchema } from "@/lib/validations";
import { IInstructorRepository } from '@/src/domain/repositories/instructor-repository.interface';
import { CreateInstructor } from '@/src/domain/entities/instructor';
import { InputParseError } from '@/src/domain/entities/errors/common';

export class UpdateInstructorAccountSettingsUseCase {
  constructor(private instructorRepository: IInstructorRepository) {}

  async execute(id: string, data: Partial<CreateInstructor>) {
    const instructor = await this.instructorRepository.findById(id);
    if (!instructor) {
      throw new Error('Instructor not found');
    }

    const { data: validatedSchema, error: inputParseError } =
      updateInstructoreAccountSettingsSchema.safeParse(data);

    if (inputParseError) {
      throw new InputParseError('Invalid input data', {
        cause: inputParseError,
      });
    }

    return this.instructorRepository.update(id, validatedSchema);
  }
}
