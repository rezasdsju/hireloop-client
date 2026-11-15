const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const getUserPremiumById = async (userId: string) => {
    const response = await fetch(`${BASE_URL}/users/${userId}/premium`);
    return response.json();
};
