"use client";
import {
    Button,
    Checkbox,
    FormControl,
    FormGroup,
    Input,
    Radio,
    RadioGroup,
    TextField,
    useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EastIcon from "@mui/icons-material/East";
import Link from "next/link";

const OnBoardingStages = () => {
    const theme: any = useTheme();
    const [role, setRole] = useState("");
    const [username, setUsername] = useState("");
    const [currentStage, setCurrentStage] = useState(0);
    const [collaboration, setCollaboration] = useState<any>([]);
    const [collaborationEmail, setCollaborationEmail] = useState<any>({
        invite1: "",
        invite2: "",
        invite3: "",
    });
    const [usage, setUsage] = useState("");
    const [pricingPlan, setPricingPlan] = useState("");

    const roles = [
        {
            value: "Business Strategist",
            image: "strategy",
        },
        {
            value: "Financial Analyst",
            image: "analyst",
        },
        {
            value: "Investment Advisor",
            image: "investment",
        },
        {
            value: "Strategic Planner",
            image: "planing",
        },
        {
            value: "Corporate Planner",
            image: "corporate",
        },
        {
            value: "Chief Financial Officer",
            image: "cfo",
        },
    ];

    // const speak = (text: any) => {
    //     if (window['speechSynthesis'] === undefined) {
    //         return;
    //     }

    //     var synth = window.speechSynthesis;
    //     var utterThis = new SpeechSynthesisUtterance(text);
    //     synth.speak(utterThis);
    // }

    // useEffect(() => {
    //     speak("Hiiii! I'm Bob, your personal assistant. I'll be guiding you through your onboarding process.");
    // }, [])

    const Stage1 = () => {
        return (
            <>
                <div className="relative flex justify-center items-center w-full">
                    <img
                        src="/images/bob.png"
                        className="max-w-full w-[150px] my-8"
                        alt="bob"
                    />
                    <div className="absolute top-1/3 left-1/2 translate-x-[60px] -translate-y-[35px] flex justify-center items-center p-1 border-2 border-primary rounded-t-md rounded-e-md">
                        <div className="animate-bounce w-2 h-2 rounded-full bg-primary"></div>
                        <div className="animate-bounce delay-200 w-2 h-2 rounded-full bg-primary mx-2"></div>
                        <div className="animate-bounce delay-500 w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                </div>
                <p className="font-semibold text-xl mb-8 text-center">
                    Hi! I'm Bob, your personal assistant👋.
                    <br />
                    I'll be guiding you through your onboarding process.
                </p>
                <Button
                    onClick={nextStage}
                    variant="contained"
                    className="!font-semibold !capitalize !text-white"
                >
                    Let's get Started
                </Button>
            </>
        );
    };
    const Stage2 = () => {
        return (
            <>
                <p className="font-semibold text-xl mb-8 text-center">
                    To personalize your experience, please choose<br /> a username for your
                    account.
                </p>
                <FormControl fullWidth>
                    <Input
                        id={`answer`}
                        placeholder={stages[1]?.placeholder}
                        onChange={(e) => {
                            setUsername(e?.target?.value);
                        }}
                        value={stages[currentStage].getter}
                    />
                </FormControl>
            </>
        );
    };
    const Stage3 = () => {
        return (
            <>
                <p className="font-semibold text-xl mb-8">
                    Which role best describes you?
                </p>
                <FormControl>
                    <RadioGroup
                        className="w-full flex justify-around items-center flex-wrap !flex-row"
                        aria-labelledby="demo-customized-radios"
                        name="customized-radios"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setRole(event.target.value)
                        }
                    >
                        {roles?.map((role: any, index: any) => {
                            return (
                                <FormControl
                                    key={index}
                                    className="w-1/3 flex justify-center items-center"
                                >
                                    <label>
                                        <div className="cursor-pointer m-3 relative w-[180px] h-[160px] flex justify-end items-center flex-col p-2  rounded-md shadow-md">
                                            <img
                                                src={`/images/${role?.image}.png`}
                                                className="w-[75px] max-w-full"
                                                alt={role?.value}
                                            />
                                            <p className="font-semibold my-4 text-md">
                                                {role?.value}
                                            </p>
                                            <Radio
                                                className="!absolute !top-1 !right-1"
                                                value={role?.value}
                                                name="radio-buttons"
                                                inputProps={{ "aria-label": role?.value }}
                                            />
                                        </div>
                                    </label>
                                </FormControl>
                            );
                        })}
                    </RadioGroup>
                </FormControl>
            </>
        );
    };
    const Stage4 = () => {
        const handleCheckboxChange = (event: any) => {
            const value = event.target.value;
            if (event.target.checked) {
                setCollaboration([...collaboration, value]);
            } else {
                setCollaboration(collaboration.filter((role: any) => role !== value));
            }
        };

        return (
            <>
                <p className="font-semibold text-xl mb-8 text-center">
                    Who are you collaborating with in your work?
                </p>
                <FormGroup className="w-full flex justify-around items-center flex-wrap !flex-row">
                    {roles?.map((role: any, index: any) => {
                        return (
                            <FormControl
                                key={index}
                                className="w-1/3 flex justify-center items-center"
                            >
                                <label>
                                    <div className="cursor-pointer m-3 relative w-[180px] h-[160px] flex justify-end items-center flex-col p-2  rounded-md shadow-md">
                                        <img
                                            src={`/images/${role?.image}.png`}
                                            className="w-[75px] max-w-full"
                                            alt={role?.value}
                                        />
                                        <p className="font-semibold my-4 text-md">{role?.value}</p>
                                        <Checkbox
                                            checked={collaboration.includes(role?.value)}
                                            onChange={handleCheckboxChange}
                                            className="!absolute !top-1 !right-1"
                                            value={role?.value}
                                            name="radio-buttons"
                                            inputProps={{ "aria-label": role?.value }}
                                        />
                                    </div>
                                </label>
                            </FormControl>
                        );
                    })}
                </FormGroup>
            </>
        );
    };
    const Stage5 = () => {
        const handleInvitationEmailChange = (e: any, key: any) => {
            const value = e.target.value;
            setCollaborationEmail({
                ...collaborationEmail,
                [key]: value,
            });
        };
        return (
            <>
                <p className="font-semibold text-xl mb-8 text-center">
                    Do you want to invite others to collaborate with you?
                </p>
                <FormGroup className="w-full flex justify-around items-center flex-wrap !flex-row">
                    {Object.keys(collaborationEmail).map((key) => (
                        <FormControl fullWidth key={key} className="!my-4">
                            <TextField
                                size="small"
                                id={`answer-${key}`}
                                placeholder={`Enter Email`}
                                variant="outlined"
                                onChange={(e: any) => {
                                    handleInvitationEmailChange(e, key);
                                }}
                                value={collaborationEmail[key]}
                            />
                        </FormControl>
                    ))}
                </FormGroup>
            </>
        );
    };
    const Stage6 = () => {
        return (
            <>
                <p className="font-semibold text-xl mb-8 text-center">
                    Are you using this tool as an individual user or on behalf of a
                    company?
                </p>
                <FormControl>
                    <RadioGroup
                        className="w-full flex justify-around items-center flex-wrap !flex-row"
                        aria-labelledby="demo-customized-radios"
                        name="customized-radios"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setUsage(event.target.value)
                        }
                    >
                        <FormControl className="w-1/2 flex justify-center items-center">
                            <label>
                                <div className="cursor-pointer m-3 relative w-[180px] h-[160px] flex justify-end items-center flex-col p-2  rounded-md shadow-md">
                                    <img
                                        src={`/images/single-user.png`}
                                        className="w-[75px] max-w-full"
                                        alt="single-user"
                                    />
                                    <p className="font-semibold my-4 text-md">Single User</p>
                                    <Radio
                                        className="!absolute !top-1 !right-1"
                                        value="Single User"
                                        name="radio-buttons"
                                        inputProps={{ "aria-label": "Single User" }}
                                    />
                                </div>
                            </label>
                        </FormControl>
                        <FormControl className="w-1/2 flex justify-center items-center">
                            <label>
                                <div className="cursor-pointer m-3 relative w-[180px] h-[160px] flex justify-end items-center flex-col p-2  rounded-md shadow-md">
                                    <img
                                        src={`/images/teams.png`}
                                        className="w-[75px] max-w-full"
                                        alt="teams"
                                    />
                                    <p className="font-semibold my-4 text-md">Teams</p>
                                    <Radio
                                        className="!absolute !top-1 !right-1"
                                        value="teams"
                                        name="radio-buttons"
                                        inputProps={{ "aria-label": "teams" }}
                                    />
                                </div>
                            </label>
                        </FormControl>
                    </RadioGroup>
                </FormControl>
            </>
        );
    };
    const Stage7 = () => {
        return (
            <>
                <p className="font-semibold text-xl mb-8 text-center">
                    What is your Pricing Plan?
                </p>
                <FormControl>
                    <RadioGroup
                        className="w-full flex justify-around items-center flex-wrap !flex-row"
                        aria-labelledby="demo-customized-radios"
                        name="customized-radios"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setPricingPlan(event.target.value)
                        }
                    >
                        <FormControl className="w-1/2 flex justify-center items-center">
                            <label>
                                <div className="cursor-pointer m-3 relative w-[180px] h-[160px] flex justify-end items-center flex-col p-2  rounded-md shadow-md">
                                    <img
                                        src={`/images/free.png`}
                                        className="w-[75px] max-w-full"
                                        alt="free"
                                    />
                                    <p className="font-semibold my-4 text-md">Free Plan</p>
                                    <Radio
                                        className="!absolute !top-1 !right-1"
                                        value="Free Plan"
                                        name="free-plan-button"
                                        inputProps={{ "aria-label": "Free Plan" }}
                                    />
                                </div>
                            </label>
                        </FormControl>
                        <FormControl className="w-1/2 flex justify-center items-center">
                            <label>
                                <div className="cursor-pointer m-3 relative w-[180px] h-[160px] flex justify-end items-center flex-col p-2  rounded-md shadow-md">
                                    <img
                                        src={`/images/pro.png`}
                                        className="w-[75px] max-w-full"
                                        alt="pro"
                                    />
                                    <p className="font-semibold my-4 text-md">Pro Plan</p>
                                    <Radio
                                        className="!absolute !top-1 !right-1"
                                        value="Pro Plan"
                                        name="pro-plan-button"
                                        inputProps={{ "aria-label": "pro plan" }}
                                    />
                                </div>
                            </label>
                        </FormControl>
                    </RadioGroup>
                </FormControl>
            </>
        );
    };
    const Stage8 = () => {
        return (
            <>
                <p className="font-semibold text-xl mb-8 text-center">
                    Awesome! You're all set. Let's get started!🚀
                </p>
                <Link href={"Dashboard"}>
                    <Button
                        variant="contained"
                        className="!capitalize !text-white !font-semibold"
                    >
                        Go To My Dashboard
                    </Button>
                </Link>
            </>
        );
    };
    const stages: any = [
        {
            id: 1,
            component: Stage1,
        },
        {
            id: 2,
            component: Stage2,
        },
        {
            id: 3,
            component: Stage3,
        },
        {
            id: 4,
            component: Stage4,
        },
        {
            id: 5,
            component: Stage5,
        },
        {
            id: 6,
            component: Stage6,
        },
        {
            id: 7,
            component: Stage7,
        },
        {
            id: 8,
            component: Stage8,
        },
    ];
    const nextStage = () => {
        if (currentStage < stages.length - 1) {
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
    return (
        <>
            <div className="min-h-screen h-screen flex flex-col justify-center items-center w-[40%] mx-auto">
                {stages?.[currentStage]?.component()}
                {currentStage !== 7 && (
                    <div
                        className={`flex items-center w-full mx-auto my-8 px-5 select-none ${currentStage === 0 || currentStage === 1
                            ? "justify-end"
                            : currentStage === 10
                                ? "justify-start"
                                : "justify-between"
                            }`}
                    >
                        {currentStage !== 0 && currentStage !== 1 && (
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
                        {currentStage !== 0 && (
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
                )}
            </div>
        </>
    );
};

export default OnBoardingStages;
