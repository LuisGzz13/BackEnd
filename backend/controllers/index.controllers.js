export const getIndex = (req, res) => { res.send('Hello World from API'); };
export const getPing  = (req, res) => { res.send('pong'); };

export const testDB = async (req, res) => {
    try {
            res.status(200).json({
                success: true,
            message: "API is up and running! (MongoDB version)",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unexpected error",
            error: error.message
        });
    }
};

