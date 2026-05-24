import { useState } from "react";
import { OnBoardingLayout } from "@/features/onboarding/components/OnBoardingLayout";
import { OnBoardingSkipDialog } from "@/features/onboarding/components/OnBoardingSkipDialog";
import {
  OnBoardingBasicInfoStep,
  OnBoardingLifestyleStep,
  OnBoardingPriorityStep,
  OnBoardingSchoolInfoStep,
} from "@/features/onboarding/components/steps";
import { useOnboardingFlow } from "@/features/onboarding/hooks/useOnboardingFlow";
import type { OnBoardingPageContentProps } from "@/features/onboarding/types";

function OnBoardingPageContent({
  initialValues,
  isSubmitting = false,
  onBack,
  onNext,
  progressStates,
  userName = "OO",
}: OnBoardingPageContentProps) {
  const [skipDialogOpen, setSkipDialogOpen] = useState(false);
  const {
    currentStep,
    currentStepMeta,
    formValues,
    handleBack,
    handleChangeBasicInfoField,
    handleChangeSchoolInfoField,
    handleSelectDormitory,
    handleSelectGender,
    handleSelectLifestyleSingle,
    handleSelectSemesterType,
    handleSkipCurrentStep,
    handleSubmit,
    handleToggleLifestyleMulti,
    handleTogglePriorityFactor,
  } = useOnboardingFlow({
    initialValues,
    onBack,
    onNext,
    progressStates,
    userName,
  });

  const handleHeaderAction = () => {
    if (currentStep === "lifestyle" || currentStep === "preferences") {
      setSkipDialogOpen(true);
      return;
    }

    handleSkipCurrentStep();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <OnBoardingLayout
          actionDisabled={!currentStepMeta.isComplete || isSubmitting}
          actionLabel={currentStepMeta.actionLabel}
          description={currentStepMeta.description}
          footerDescription={currentStepMeta.footerDescription}
          footerDescriptionKey={currentStepMeta.footerDescriptionKey}
          headerActionLabel={currentStepMeta.headerActionLabel}
          onBack={handleBack}
          onHeaderAction={
            currentStep === "lifestyle" || currentStep === "preferences"
              ? handleHeaderAction
              : undefined
          }
          progressStates={currentStepMeta.progressStates}
          title={currentStepMeta.title}
        >
          {currentStep === "basic-info" ? (
            <OnBoardingBasicInfoStep
              values={formValues}
              onFieldChange={handleChangeBasicInfoField}
              onGenderChange={handleSelectGender}
            />
          ) : null}

          {currentStep === "school-info" ? (
            <OnBoardingSchoolInfoStep
              values={formValues}
              onFieldChange={handleChangeSchoolInfoField}
              onDormitoryChange={handleSelectDormitory}
              onSemesterTypeChange={handleSelectSemesterType}
            />
          ) : null}

          {currentStep === "lifestyle" ? (
            <OnBoardingLifestyleStep
              values={formValues}
              onSingleSelectChange={handleSelectLifestyleSingle}
              onMultiSelectChange={handleToggleLifestyleMulti}
            />
          ) : null}

          {currentStep === "preferences" ? (
            <OnBoardingPriorityStep
              selectedFactors={formValues.priorityFactors}
              onToggleFactor={handleTogglePriorityFactor}
            />
          ) : null}
        </OnBoardingLayout>
      </form>

      <OnBoardingSkipDialog
        open={skipDialogOpen}
        onOpenChange={setSkipDialogOpen}
        onContinue={() => {
          setSkipDialogOpen(false);
        }}
        onSkip={() => {
          setSkipDialogOpen(false);
          handleSkipCurrentStep();
        }}
      />
    </>
  );
}

export { OnBoardingPageContent };
