"use client";
import React, { useEffect, useState } from "react";
import EastIcon from "@mui/icons-material/East";
import {
    selectCompany,
    useSelector,
    companySlice,
    useDispatch,
} from "@/lib/redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
    Button,
    FormControl,
    Input,
    MenuItem,
    Select,
    useTheme,
} from "@mui/material";
import { useCreateCompanyMutation } from "@/lib/redux/Api";
import { useCreateProjectMutation } from "@/lib/redux/projectApi";

const ProjectStages = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const company = useSelector(selectCompany);
    const [inputError, setInputError] = useState("");
    const [currentStage, setCurrentStage] = useState(0);
    // const [CreateCompany] = useCreateCompanyMutation();
    const [CreateCompany] = useCreateProjectMutation();
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
            type: "text",
            error: "Company Name is Required",
            placeholder: "Enter your Company Name",
            required: true,
        },
        {
            id: 2,
            content: "Next, what industry is your company in?",
            getter: industry,
            setter: companySlice.actions.setIndustry,
            type: "select",
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
            required: true,
        },
        {
            id: 3,
            content:
                "Within your industry, what particular vertical are you tackling",
            getter: vertical,
            setter: companySlice.actions.setVertical,
            type: "text",
            error: "Vertical is Required",
            placeholder: "Enter your Vertical",
            required: true,
        },
        {
            id: 4,
            content: "What type of company are you?",
            example: "e.g. B2B, B2C, B2B2C, etc.",
            getter: companyType,
            setter: companySlice.actions.setCompanyType,
            type: "select",
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
            required: true,
        },
        {
            id: 5,
            content: "What is the size of your company?",
            example: "e.g. 1-10, 11-50, 51-200, 201-500, 501-1000, 1000+",
            getter: companySize,
            setter: companySlice.actions.setCompanySize,
            type: "select",
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
            required: true,
        },
        {
            id: 6,
            content: "Where is the primary headquarters of your company?",
            example: "e.g. San Francisco, CA, USA",
            getter: companyHeadquarters,
            setter: companySlice.actions.setCompanyHeadquarters,
            type: "select",
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
            required: true,
        },
        {
            id: 7,
            content: "Where are the primary target regions of your company?",
            example: "e.g. North America, Europe, Asia, etc.",
            getter: companyTargetRegions,
            setter: companySlice.actions.setCompanyTargetRegions,
            type: "select",
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
            required: true,
        },
        {
            id: 8,
            content: "What stage of funding are you in?",
            example: "e.g. Pre-seed, Seed, Series A, etc.",
            getter: fundingStage,
            setter: companySlice.actions.setFundingStage,
            type: "select",
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
            required: true,
        },
        {
            id: 9,
            content: "What is your current annual recurring revenue (ARR)?",
            example: "e.g. $0, $1-$100k, $100k-$1M, $1M-$10M, $10M+",
            getter: annualRevenue,
            setter: companySlice.actions.setAnnualRevenue,
            type: "select",
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
            required: true,
        },
        {
            id: 10,
            content: "How would you describe your business model?",
            example: "e.g. Subscription, Transactional, etc.",
            getter: businessModel,
            setter: companySlice.actions.setBusinessModel,
            type: "select",
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
            required: true,
        },
        {
            id: 11,
            message: "Project Created Successfully!!",
            type: "message",
        },
    ];

    const nextStage = () => {
        if (currentStage < stages.length - 1) {
            const currentStageData = stages[currentStage];
            if (currentStageData.required && !currentStageData.getter) {
                setInputError(currentStageData.error);
                return;
            }

            if (currentStage === 9) {
                CreateCompany({ projectData: company })
            }
            setInputError("");
            setCurrentStage(currentStage + 1);
            setTimeout(() => {
                const answerInput = document.getElementById("answer");
                if (answerInput) {
                    answerInput.focus();
                }
            }, 0);
        }
    };

    const previousStage = () => {
        if (currentStage > 0) {
            setCurrentStage(currentStage - 1);
            setTimeout(() => {
                const answerInput = document.getElementById("answer");
                if (answerInput) {
                    answerInput.focus();
                }
            }, 0);
        }
    };

    const handleInputChange = (e: any) => {
        const currentStageData = stages[currentStage];
        if (inputError && currentStageData.required && e.target.value) {
            setInputError("");
        }
        dispatch(currentStageData?.setter(e.target.value));
    };

    return (
        <>
            <div className="flex justify-between items-start flex-col">
                <div className="flex justify-center items-start flex-col w-full">
                    <p className="py-8 text-lg">{stages[currentStage]?.content}</p>
                    {stages[currentStage]?.type === "select" ? (
                        <FormControl fullWidth size="small">
                            <Select
                                fullWidth
                                id={`answer`}
                                placeholder={stages[currentStage]?.placeholder}
                                onChange={(e) => {
                                    handleInputChange(e);
                                }}
                                value={stages[currentStage]?.getter || `Select an Option`}
                            >
                                <MenuItem disabled value="Select an Option">
                                    Select an Option
                                </MenuItem>
                                {stages[currentStage].options.map((option: any) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                            {/* Display the error message */}
                            {inputError && (
                                <div className="text-red-500 pt-3">{inputError}</div>
                            )}
                        </FormControl>
                    ) : stages[currentStage]?.type === "text" ? (
                        <FormControl fullWidth>
                            <Input
                                id={`answer`}
                                placeholder={stages[currentStage]?.placeholder}
                                onChange={(e) => {
                                    handleInputChange(e);
                                }}
                                value={stages[currentStage].getter}
                            />
                            {/* Display the error message */}
                            {inputError && (
                                <div className="text-red-500 pt-3">{inputError}</div>
                            )}
                        </FormControl>
                    ) : (
                        <>
                            <div className="flex justify-cecnter items-center flex-col w-full">
                                <p className="text-xl py-4">{stages[currentStage]?.message}</p>
                                <Button
                                    variant="contained"
                                    className="py-3 !text-white !capitalize !font-semibold"
                                >
                                    Let's get Started
                                </Button>
                            </div>
                        </>
                    )}
                </div>
                <div
                    className={`flex items-center w-full my-8 px-5 select-none ${currentStage === 0
                        ? "justify-end"
                        : currentStage === 10
                            ? "justify-start"
                            : "justify-between"
                        }`}
                >
                    {currentStage !== 0 && (
                        <div
                            onClick={previousStage}
                            style={{ color: theme.palette.primary.main }}
                            className="cursor-pointer flex justify-start items-center"
                        >
                            <ArrowBackIcon />
                            &nbsp;
                            <span>Prev</span>
                        </div>
                    )}
                    {currentStage !== 10 && (
                        <div
                            onClick={nextStage}
                            style={{ color: theme.palette.primary.main }}
                            className="cursor-pointer flex justify-start items-center"
                        >
                            <span>Next</span>
                            &nbsp;
                            <EastIcon />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProjectStages;
