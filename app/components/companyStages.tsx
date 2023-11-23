'use client';
import { Box } from "@chakra-ui/layout";
import {
    Button,
    Flex,
    FormControl,
    FormHelperText,
    Heading,
    Input,
    Select,
    Spinner,
    Text,
    Textarea,
    useToast,
} from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import {
    useSelector,
    useDispatch,
    selectCompany,
    selectOnBoardingLoading,
    companySlice,
    fetchCompany,
    createCompany,
} from "@/lib/redux";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CompanyStages = () => {
    const toast = useToast();
    const router = useRouter();
    const dispatch = useDispatch();
    const company = useSelector(selectCompany);
    const [loading, setLoading] = useState(false);
    const [stepErrors, setStepErrors] = useState<any>({});
    const {
        companyName,
        industry,
        vertical,
        companyType,
        companySize,
        companyHeadquarters,
        companyTargetRegions,
        fundingStage,
        annualRevenue,
        businessModel,
    } = company;

    const stages: any[] = [
        {
            id: 1,
            content:
                "First, let's start with your company. What is the name of your company?",
            getter: companyName,
            setter: companySlice.actions.setCompanyName,
            type: 'text',
            error: "Company Name is Required",
            category: "Company Information",
            placeholder: "Enter your Company Name",
            required: true
        },
        {
            id: 2,
            content: "Next, what industry is your company in?",
            getter: industry,
            setter: companySlice.actions.setIndustry,
            type: 'select',
            error: "Industry is Required",
            placeholder: "Enter your Industry Type",
            options: [
                "Aerospace",
                "Automotive",
                "Biotechnology",
                "Chemical",
                "Computer Hardware",
                "Computer Software",
                "Construction",
                "Consumer Electronics",
                "Defense",
                "Education",
                "Energy",
                "Entertainment",
                "Fashion",
                "Finance",
                "Food and Beverage",
                "Healthcare",
                "Hospitality",
                "Information Technology",
                "Manufacturing",
                "Media",
                "Mining",
                "Music",
                "Pharmaceuticals",
                "Retail",
                "Telecommunications",
                "Transportation",
                "Other",
            ],
            category: "Company Information",
            required: true
        },
        {
            id: 3,
            content:
                "Within your industry, what particular vertical are you tackling",
            getter: vertical,
            setter: companySlice.actions.setVertical,
            category: "Company Information",
            type: 'text',
            error: "Vertical is Required",
            placeholder: "Enter your Vertical",
            required: true
        },
        {
            id: 4,
            content: "What type of company are you?",
            example: "e.g. B2B, B2C, B2B2C, etc.",
            getter: companyType,
            setter: companySlice.actions.setCompanyType,
            category: "Company details",
            type: 'select',
            error: "Company Type is Required",
            placeholder: "Enter your Company Type",
            options: [
                "B2B (Business-to-Business)",
                "B2C (Business-to-Consumer)",
                "B2B2C (Business-to-Business-to-Consumer)",
                "C2C (Consumer-to-Consumer)",
                "D2C (Direct-to-Consumer)",
                "G2B (Government-to-Business)",
                "G2C (Government-to-Consumer)",
                "Non-Profit",
                "Other",
            ],
            required: true
        },
        {
            id: 5,
            content: "What is the size of your company?",
            example: "e.g. 1-10, 11-50, 51-200, 201-500, 501-1000, 1000+",
            getter: companySize,
            setter: companySlice.actions.setCompanySize,
            category: "Company details",
            type: 'select',
            error: "Company Size is Required",
            placeholder: "Enter your Company Size",
            options: [
                "1-10 employees",
                "11-50 employees",
                "51-200 employees",
                "201-500 employees",
                "501-1000 employees",
                "1000+ employees",
            ],
            required: true
        },
        {
            id: 6,
            content: "Where is the primary headquarters of your company?",
            example: "e.g. San Francisco, CA, USA",
            getter: companyHeadquarters,
            setter: companySlice.actions.setCompanyHeadquarters,
            category: "Company details",
            type: 'select',
            error: "Primary Headquarters is Required",
            placeholder: "Enter your Primary Headquarters",
            options: [
                "San Francisco, CA, USA",
                "New York City, NY, USA",
                "London, UK",
                "Tokyo, Japan",
                "Sydney, Australia",
                "Los Angeles, CA, USA",
                "Chicago, IL, USA",
                "Toronto, Canada",
                "Shanghai, China",
                "Singapore",
                "Mumbai, India",
                "Paris, France",
                "Berlin, Germany",
                "Seoul, South Korea",
                "Hong Kong",
            ],
            required: true
        },
        {
            id: 7,
            content: "Where are the primary target regions of your company?",
            example: "e.g. North America, Europe, Asia, etc.",
            getter: companyTargetRegions,
            setter: companySlice.actions.setCompanyTargetRegions,
            category: "Company details",
            type: 'select',
            error: "Target Regions are Required",
            placeholder: "Enter your Target Regions",
            options: [
                "San Francisco, CA, USA",
                "New York City, NY, USA",
                "London, UK",
                "Tokyo, Japan",
                "Sydney, Australia",
                "Los Angeles, CA, USA",
                "Chicago, IL, USA",
                "Toronto, Canada",
                "Shanghai, China",
                "Singapore",
                "Mumbai, India",
                "Paris, France",
                "Berlin, Germany",
                "Seoul, South Korea",
                "Hong Kong",
            ],
            required: true
        },
        {
            id: 8,
            content: "What stage of funding are you in?",
            example: "e.g. Pre-seed, Seed, Series A, etc.",
            getter: fundingStage,
            setter: companySlice.actions.setFundingStage,
            category: "Financial details",
            type: 'select',
            error: "Funding is Required",
            placeholder: "Enter your Funding Stage",
            options: [
                "Pre-seed",
                "Seed",
                "Series A",
                "Series B",
                "Series C",
                "Series D and beyond",
                "Bootstrapped",
                "Not Applicable (e.g., non-profit)",
                "Other",
            ],
            required: true
        },
        {
            id: 9,
            content: "What is your current annual recurring revenue (ARR)?",
            example: "e.g. $0, $1-$100k, $100k-$1M, $1M-$10M, $10M+",
            getter: annualRevenue,
            setter: companySlice.actions.setAnnualRevenue,
            category: "Financial details",
            type: 'select',
            error: "Annual Recurring Revenue is Required",
            placeholder: "Enter your ARR",
            options: [
                "$0",
                "$1 - $100k",
                "$100k - $1M",
                "$1M - $10M",
                "$10M+",
                "Not Applicable",
                "Other",
            ],
            required: true
        },
        {
            id: 10,
            content: "How would you describe your business model?",
            example: "e.g. Subscription, Transactional, etc.",
            getter: businessModel,
            setter: companySlice.actions.setBusinessModel,
            category: "Business Model",
            type: 'select',
            error: "Business Model is Required",
            placeholder: "Enter your Business Model",
            options: [
                "Subscription",
                "Transactional",
                "Freemium",
                "Marketplace",
                "SaaS (Software as a Service)",
                "E-commerce",
                "Ad-based",
                "On-demand",
                "Service-based",
                "Not Applicable",
                "Other",
            ],
            required: true
        }

    ];
    const groupedStages: any = {};
    stages.forEach((stage: any) => {
        const { category }: { category: any } = stage;
        if (!groupedStages[category]) {
            groupedStages[category] = [];
        }
        groupedStages[category].push(stage);
    });

    const steps = Object.keys(groupedStages).map((category) => ({
        label: category,
    }));
    const { nextStep, prevStep, reset, activeStep } = useSteps({
        initialStep: 0,
    });
    const isLastStep = activeStep === steps.length - 1;
    const hasCompletedAllSteps = activeStep === steps.length;

    const validateStep = () => {
        const currentStep = steps[activeStep].label;
        const currentStepFields = groupedStages[currentStep];
        const errors: any = {};
        currentStepFields.forEach((field: any) => {
            if (field.required && !field.getter) {
                errors[field.id] = field.error;
            }
        });
        setStepErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleNextStep = () => {
        if (isLastStep) {
            const newCompany = {
                companyName,
                industry,
                vertical,
                companyType,
                companySize,
                companyHeadquarters,
                companyTargetRegions,
                fundingStage,
                annualRevenue,
                businessModel,
            };
            setLoading(true);
            dispatch(createCompany(newCompany))
                .then((data:any) => {
                    if (data !== undefined && data !== null) {
                        toast({
                            title: "Data Saved",
                            description: "Your data has been saved successfully.",
                            status: "success",
                            duration: 5000,
                            isClosable: true,
                        });
                        // router.push("/ThinkBeyond");
                        nextStep();
                    }
                })
                .catch((error:any) => {
                    toast({
                        title: "Error",
                        description: "Failed to save data. Please try again.",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                })
                .finally(() => {
                    setLoading(false);
                });
        } else if (validateStep()) {
            nextStep();
        }
    };
    return (
        <Flex flexDir="column" width="80%">
            <Steps
                responsive={true}
                variant="circles-alt"
                colorScheme="green"
                activeStep={activeStep}
            >
                {steps.map(({ label }, index) => (
                    <Step label={label} key={label}>
                        <Flex
                            height={"55vh"}
                            mt={14}
                            flexDir="column"
                            alignItems={"center"}
                            overflowY={"auto"}
                            width={"70vw"}
                            mx={'auto'}
                        >
                            {groupedStages?.[label].map((stage: any, index: number) => (
                                <Flex
                                    key={index}
                                    my={2}
                                    direction="column"
                                    alignItems="start"
                                    justifyContent="center"
                                    width={"80%"}
                                >
                                    <Text fontSize="md" color="black" mt={2}>
                                        {stage.content}
                                    </Text>
                                    {stage.type === "select" ? (
                                        <FormControl mt={2} isRequired>
                                            <Select
                                                id={`answer_${index}`}
                                                placeholder={stage?.placeholder}
                                                onChange={(e) => {
                                                    dispatch(stage?.setter(e.target.value));
                                                }}
                                                value={stage?.getter}
                                            >
                                                {stage.options.map((option: any) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </Select>
                                            {/* {stage.example && <FormHelperText my={2}>{stage.example}</FormHelperText>} */}
                                        </FormControl>
                                    ) : (
                                        <FormControl mt={2} isRequired>
                                            <Input
                                                id={`answer_${index}`}
                                                placeholder={stage?.placeholder}
                                                onChange={(e) => {
                                                    dispatch(stage?.setter(e.target.value));
                                                }}
                                                value={stage.getter}
                                            />
                                            {/* {stage.example && <FormHelperText my={2}>{stage.example}</FormHelperText>} */}
                                        </FormControl>
                                    )}
                                    {stepErrors[stage.id] &&
                                        (
                                            <Text color="red" my={2}>{stepErrors[stage.id]}</Text>
                                        )}
                                </Flex>
                            ))}
                        </Flex>
                    </Step>
                ))}
            </Steps>
            {hasCompletedAllSteps && (
                <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} sx={{ my: 8, p: 8, rounded: "md" }} width="70vw">
                    <Heading fontSize="xl" textAlign={"center"}>
                        Awesome! You're all set. Let's get started!🚀
                    </Heading>
                    <Button
                        isDisabled={activeStep === 0}
                        onClick={() => { router.push('ThinkBeyond') }}
                        size="md"
                        mt={10}
                        colorScheme="green"
                        variant="solid"
                    >
                        Let's Get Started
                    </Button>
                </Box>
            )}
            <Flex width="100%" justify="flex-end" gap={4} mt={'30px'}>
                {!hasCompletedAllSteps && <>
                    <Button
                        isDisabled={activeStep === 0}
                        onClick={prevStep}
                        size="md"
                        variant="outline"
                    >
                        Prev
                    </Button>
                    <Button colorScheme="green" size="md" onClick={handleNextStep}>
                        {loading ? (
                            <Spinner
                                thickness="4px"
                                speed="0.65s"
                                emptyColor="gray.200"
                                color="green.500"
                                size="md"
                            />
                        ) : (
                            isLastStep ? "Save" : "Next"
                        )}
                    </Button>

                </>}
            </Flex>
        </Flex>
    );
}

export default CompanyStages