import { Company } from "@/app/Interfaces";
import { BOB_CARDS } from "./constants";

export async function APIfetchCompany() {
    try {
        const response = await fetch(`${BOB_CARDS}/company`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response?.ok) {
            throw new Error('Failed to fetch Company Data');
        }
        const result = await response?.json()
        return result;
    } catch (error) {
        throw new Error('Failed to fetch Company Data');
    }
};

export async function APIcreateCompany(data: Company) {
    try {
        const response = await fetch(`${BOB_CARDS}/company`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if (!response?.ok) {
            throw new Error('Failed to save company Data');
        }
        const result = await response?.json()
        return result;
    } catch (error) {
        throw new Error('Failed to save company Data');
    }
};

export async function APIfetchThinkBeyondCards() {
    try {
        const response = await fetch(`${BOB_CARDS}/ThinkBeyond`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            next: {
                tags: ['thinkBeyondCards']
            }
        });

        if (!response?.ok) {
            throw new Error('Failed to fetch thinkBeyondCards');
        }
        const result = await response?.json();
        return result;
    } catch (error) {
        throw new Error('Failed to fetch thinkBeyondCards');
    }
};
export async function APIResetThinkBeyond() {
    try {
        const response = await fetch(`${BOB_CARDS}/ThinkBeyond/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (!response?.ok) {
            throw new Error(`Failed to Reset ThinkBeyond`);
        }
        const result = await response?.json()
        return result;
    } catch (error: any) {
        throw new Error(`Failed to Reset ThinkBeyond`);
    }
}
export async function APIupdateThinkBeyondCard(updatedCard: any) {
    try {
        const updateCardUrl = `${BOB_CARDS}/ThinkBeyond`;
        const response = await fetch(updateCardUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCard),
        })
        if (!response?.ok) {
            throw new Error(`Failed to Update Think Beyond Card ${updatedCard?.cardname}`);
        }
        const result = await response?.json()
        return result;
    } catch (error: any) {
        throw new Error(`Failed to Update Think Beyond Card ${updatedCard?.cardname}`);
    }
};

export async function APIThinkBeyondNextCard(cardId: any) {
    try {
        const updateCardUrl = `${BOB_CARDS}/ThinkBeyond/nextCard`;
        const response = await fetch(updateCardUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cardId }),
        })
        if (!response?.ok) {
            throw new Error(`Failed to fetch Next Card`);
        }
        const result = await response?.json()
        return result;
    } catch (error: any) {
        throw new Error(`Failed to fetch Next Card`);
    }
};

export async function fetchPrefillData(url: any, data: any) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (!response?.ok) {
            throw new Error(`Failed to fetch Future 1 BMC Prefilled data`);
        }
        const result = await response?.json()
        return result;
    } catch (error: any) {
        throw new Error(`Failed to fetch Future 1 BMC Prefill data`);
    }
}

export async function APIUpdateCard(card: any) {
    try {
        const updateCardUrl = `${BOB_CARDS}/updateCard`;
        const response = await fetch(updateCardUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: card }),
        })
        if (!response?.ok) {
            throw new Error(`Failed to UpdatingCard`);
        }
        const result = await response?.json()
        return result;
    } catch (error: any) {
        throw new Error(`Failed to Update BMC Card`);
    }
};



export async function APIfetchFuture1BMC() {
    try {
        const response = await fetch(`${BOB_CARDS}/future_1/BMC`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            next: {
                tags: ['FUTURE1BMC']
            }
        });

        if (!response?.ok) {
            throw new Error('Failed to fetch Future 1 BMC Cards');
        }
        const result = await response?.json();
        return result;
    } catch (error) {
        throw new Error('Failed to fetch Future 1 BMC Cards');
    }
};
export async function APIfetchFuture1BMCChat() {
    try {
        const response = await fetch(`${BOB_CARDS}/future_1/BMC/chat`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response?.ok) {
            throw new Error('Failed to fetch Future 1 BMC Cards Chat');
        }
        const result = await response?.json();
        return result;
    } catch (error) {
        throw new Error('Failed to fetch Future 1 BMC Cards Chat');
    }
};
export async function APIFuture1BMCNextCard(cardId: any) {
    try {
        const updateCardUrl = `${BOB_CARDS}/future_1/BMC/nextCard`;
        const response = await fetch(updateCardUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cardId }),
        })
        if (!response?.ok) {
            throw new Error(`Failed to get Next BMC Card`);
        }
        const result = await response?.json()
        return result;
    } catch (error: any) {
        throw new Error(`Failed to get Next BMC Card`);
    }
};
export async function APIPrefillFuture1BMC(data: any) {
    try {
        const response = await fetch(`${BOB_CARDS}/future_1/BMC/prefill`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (!response?.ok) {
            throw new Error(`Failed to Prefill Future1 BMC`);
        }
        const result = await response?.json()
        return result;
    } catch (error: any) {
        throw new Error(`Failed to Prefill Future1 BMC`);
    }
}
export async function APIResetFuture1BMC() {
    try {
        const response = await fetch(`${BOB_CARDS}/future_1/BMC/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (!response?.ok) {
            throw new Error(`Failed to Reset Future1 BMC`);
        }
        const result = await response?.json()
        return result;
    } catch (error: any) {
        throw new Error(`Failed to Reset Future1 BMC`);
    }
}



export async function APIfetchFuture2BMC() {
    try {
        const response = await fetch(`${BOB_CARDS}/future_2/BMC`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            next: {
                tags: ['FUTURE1BMC']
            }
        });

        if (!response?.ok) {
            throw new Error('Failed to fetch Future 2 BMC Cards');
        }
        const result = await response?.json();
        return result;
    } catch (error) {
        throw new Error('Failed to fetch Future 2 BMC Cards');
    }
};
export async function APIfetchFuture2BMCChat() {
    try {
        const response = await fetch(`${BOB_CARDS}/future_2/BMC/chat`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response?.ok) {
            throw new Error('Failed to fetch Future 2 BMC Cards Chat');
        }
        const result = await response?.json();
        return result;
    } catch (error) {
        throw new Error('Failed to fetch Future 2 BMC Cards Chat');
    }
};
export async function APIFuture2BMCNextCard(cardId: any) {
    try {
        const updateCardUrl = `${BOB_CARDS}/future_2/BMC/nextCard`;
        const response = await fetch(updateCardUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cardId }),
        })
        if (!response?.ok) {
            throw new Error(`Failed to get Next BMC Card`);
        }
        const result = await response?.json()
        return result;
    } catch (error: any) {
        throw new Error(`Failed to get Next BMC Card`);
    }
};
export async function APIPrefillFuture2BMC(data: any) {
    try {
        const response = await fetch(`${BOB_CARDS}/future_2/BMC/prefill`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (!response?.ok) {
            throw new Error(`Failed to Prefill Future2 BMC`);
        }
        const result = await response?.json()
        return result;
    } catch (error: any) {
        throw new Error(`Failed to Prefill Future2 BMC`);
    }
}
export async function APIResetFuture2BMC() {
    try {
        const response = await fetch(`${BOB_CARDS}/future_2/BMC/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (!response?.ok) {
            throw new Error(`Failed to Reset Future2 BMC`);
        }
        const result = await response?.json()
        return result;
    } catch (error: any) {
        throw new Error(`Failed to Reset Future2 BMC`);
    }
}







export async function APIfetchFuture3BMC() {
    try {
        const response = await fetch(`${BOB_CARDS}/future_3/BMC`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            next: {
                tags: ['FUTURE1BMC']
            }
        });

        if (!response?.ok) {
            throw new Error('Failed to fetch Future 3 BMC Cards');
        }
        const result = await response?.json();
        return result;
    } catch (error) {
        throw new Error('Failed to fetch Future 3 BMC Cards');
    }
};
export async function APIfetchFuture3BMCChat() {
    try {
        const response = await fetch(`${BOB_CARDS}/future_3/BMC/chat`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response?.ok) {
            throw new Error('Failed to fetch Future 3 BMC Cards Chat');
        }
        const result = await response?.json();
        return result;
    } catch (error) {
        throw new Error('Failed to fetch Future 3 BMC Cards Chat');
    }
};
export async function APIFuture3BMCNextCard(cardId: any) {
    try {
        const updateCardUrl = `${BOB_CARDS}/future_3/BMC/nextCard`;
        const response = await fetch(updateCardUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cardId }),
        })
        if (!response?.ok) {
            throw new Error(`Failed to get Next BMC Card`);
        }
        const result = await response?.json()
        return result;
    } catch (error: any) {
        throw new Error(`Failed to get Next BMC Card`);
    }
};
export async function APIPrefillFuture3BMC(data: any) {
    try {
        const response = await fetch(`${BOB_CARDS}/future_3/BMC/prefill`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (!response?.ok) {
            throw new Error(`Failed to Prefill Future3 BMC`);
        }
        const result = await response?.json()
        return result;
    } catch (error: any) {
        throw new Error(`Failed to Prefill Future3 BMC`);
    }
}
export async function APIResetFuture3BMC() {
    try {
        const response = await fetch(`${BOB_CARDS}/future_3/BMC/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (!response?.ok) {
            throw new Error(`Failed to Reset Future3 BMC`);
        }
        const result = await response?.json()
        return result;
    } catch (error: any) {
        throw new Error(`Failed to Reset Future3 BMC`);
    }
}




export async function APIfetchFuture1CVP() {
    try {
        const response = await fetch(`${BOB_CARDS}/future_1/CVP`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            next: {
                tags: ['FUTURE1CVP']
            }
        });

        if (!response?.ok) {
            throw new Error('Failed to fetch CVP Cards');
        }
        const result = await response?.json();
        return result;
    } catch (error) {
        throw new Error('Failed to fetch CVP Cards');
    }
};
export async function APIfetchFuture1CVPChat() {
    try {
        const response = await fetch(`${BOB_CARDS}/future_1/CVP/chat`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response?.ok) {
            throw new Error('Failed to fetch Future 1 cvp Cards Chat');
        }
        const result = await response?.json();
        return result;
    } catch (error) {
        throw new Error('Failed to fetch Future 1 CVP Cards Chat');
    }
};
export async function PrefillFuture1CVP(data: any) {
    try {
        const response = await fetch(`${BOB_CARDS}/future_1/CVP/prefill`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (!response?.ok) {
            throw new Error(`Failed to Prefill Future 1 CVP`);
        }
        const result = await response?.json()
        return result;
    } catch (error: any) {
        throw new Error(`Failed to Prefill Future 1 CVP`);
    }
}
export async function APIResetFuture1CVP() {
    try {
        const response = await fetch(`${BOB_CARDS}/future_1/CVP/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (!response?.ok) {
            throw new Error(`Failed to Reset Future1 CVP`);
        }
        const result = await response?.json()
        return result;
    } catch (error: any) {
        throw new Error(`Failed to Reset Future1 CVP`);
    }
}





export async function APIfetchMenu() {
    try {
        const response = await fetch(`${BOB_CARDS}/Menu`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            next: {
                tags: ['Menu']
            }
        });

        if (!response?.ok) {
            throw new Error('Failed to Menu');
        }
        const result = await response?.json();
        return result;
    } catch (error) {
        throw new Error('Failed to Menu');
    }
};

export async function APIUpdateLock(data: any) {
    try {
        const response = await fetch(`${BOB_CARDS}/Menu/updateLock`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        if (!response?.ok) {
            throw new Error(`Failed to update Menu lock`);
        }
        const result = await response?.json()
        return result;
    } catch (error: any) {
        throw new Error(`Failed to update Menu lock`);
    }
}
export async function APIUpdateSelected(data: any) {
    try {
        const response = await fetch(`${BOB_CARDS}/Menu/updateSelected`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        if (!response?.ok) {
            throw new Error(`Failed to update Menu Selected`);
        }
        const result = await response?.json()
        return result;
    } catch (error: any) {
        throw new Error(`Failed to update Menu Selected`);
    }
}