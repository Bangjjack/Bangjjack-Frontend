import { z } from "zod";

const onboardingGenderSchema = z.enum(["MALE", "FEMALE"]);
const onboardingCampusSchema = z.enum(["GLOBAL_CAMPUS", "MEDICAL_CAMPUS"]);
const onboardingSemesterSchema = z.enum(["SIXTEEN_WEEKS", "TWENTY_FIVE_WEEKS"]);
const onboardingDormitorySchema = z.enum(["DORM_1", "DORM_2", "DORM_3"]);

const onboardingRequestSchema = z.object({
  birthYear: z.number().int().nonnegative(),
  campus: onboardingCampusSchema,
  departmentId: z.number().int().nonnegative(),
  dormitory: onboardingDormitorySchema,
  gender: onboardingGenderSchema,
  grade: z.number().int().nonnegative(),
  semester: onboardingSemesterSchema,
});

export {
  onboardingCampusSchema,
  onboardingDormitorySchema,
  onboardingGenderSchema,
  onboardingRequestSchema,
  onboardingSemesterSchema,
};

export type OnboardingRequestValues = z.infer<typeof onboardingRequestSchema>;
