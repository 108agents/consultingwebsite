export interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

export const sendContactForm = async (data: ContactFormData): Promise<void> => {
    try {
        // For demonstration purposes, we'll simulate a successful API call
        // In a real application, this would be a call to your backend API
        console.log('Contact form submitted:', data);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulate successful response
        return Promise.resolve();
    } catch (error) {
        console.error('Error submitting contact form:', error);
        return Promise.reject(error);
    }
};