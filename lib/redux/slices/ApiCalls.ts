const BOB_API = 'http://localhost:4000';


export async function APIfetchCompany() {
    try {
        const response = await fetch(`${BOB_API}/company`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            next: {
                tags: ['company']
            }
        });
        const result = await response?.json()
        return result;
    } catch (error) {
        throw new Error('Failed to fetch Company Data');
    }
};

export async function APIfetchCompanyById(companyId: any) {
    try {
        const response = await fetch(`${BOB_API}/company/${companyId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response?.json()
        return result;
    } catch (error) {
        throw new Error('Failed to fetch Company Data');
    }
};

export async function APIcreateCompany(data: any) {
    try {
        const response = await fetch(`${BOB_API}/company`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            // next:{
            //     revalidateTag:['company']
            // }
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



export async function APIfetchThinkBeyond() {
    try {
        const response = await fetch(`${BOB_API}/ThinkBeyond`, {
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
        const response = await fetch(`${BOB_API}/ThinkBeyond/reset`, {
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
};

export async function APIupdateThinkBeyond(updatedCard: any) {
    try {
        const updateCardUrl = `${BOB_API}/ThinkBeyond`;
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
        const updateCardUrl = `${BOB_API}/ThinkBeyond/nextCard`;
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
