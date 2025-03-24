import axios from "axios";

const fetchScoData = async (title, setMetaData, Api_url) => {
    try {
        const response = await axios.get(`${Api_url}/sco/sco/name/${title}`);
        setMetaData(response.data); // Update metadata state
        document.title = response.data.title; // Update page title
    } catch (error) {
        console.error("Error fetching Sco:", error);
    }
};

export default fetchScoData;
