

const tripsEndpoint = 'http://localhost:3000/api/trips';

const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
};

const travel = async (req, res) => {
    try {
        const response = await fetch(tripsEndpoint, options);
        let json = await response.json();
        let message = null;

        if (!response.ok || !Array.isArray(json)) {
            message = 'API lookup error';
            json = [];
        } else if (json.length === 0) {
            message = 'No trips exist in our database';
        }

        return res.render('travel', {
            title: 'Travlr Getaways',
            trips: json,
            message: message
        });

    } catch (err) {
        return res.status(500).send(err.message);
    }
};

module.exports = {
    travel
};