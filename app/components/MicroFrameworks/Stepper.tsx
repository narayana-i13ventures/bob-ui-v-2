import {
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
    Box
  } from '@chakra-ui/react'


export default function Steppr ({seeProgress}:{seeProgress:any}){
    const steps = [
        { title: 'Short', description: 'Future 1' },
        { title: 'Medium', description: 'Future 2' },
        { title: 'Long', description: 'Future 3' },
      ]
    
    const { activeStep, setActiveStep } = useSteps({
        index: 1,
        count: steps.length,
    })
      
    return (
        <Stepper overflowY={"hidden"} hidden={!seeProgress} colorScheme='green' w="full" size={['xs','xs','xs','sm','md','md']} index={activeStep}>
        {steps.map((step, index) => (
            <Step key={index} onClick={() => setActiveStep(index)}>
            <StepIndicator>
                <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
                />
            </StepIndicator>
    
            <Box flexShrink='0' fontSize={['xs','xs','xs','sm','md','md']}>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
            </Box>
    
            <StepSeparator />
            </Step>
        ))}
        </Stepper>
    )
}
