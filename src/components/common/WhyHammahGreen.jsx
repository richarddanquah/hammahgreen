export default function WhyHammahGreen({ style = "" }) {

    const whyHGContent = [
        {
            id: 1,
            icon: "flaticon-high-five",
            descriptions: `Litigation-free, high-end homes at reasonable costs.`,
        },
        {
            id: 2,
            icon: "flaticon-high-five",
            descriptions: `The estate boasts an amazing sea-view on one side and a lagoon and mountain-view on the other side.`,
        },
        {
            id: 3,
            icon: "flaticon-high-five",
            descriptions: `The estate is close to the Muni-Pomadze Ramsar site which attracts thousands of tourists every year.`,
        },
        {
            id: 4,
            icon: "flaticon-high-five",
            descriptions: `A focus on green homes which are solar powered.`,
        },
        {
            id: 5,
            icon: "flaticon-high-five",
            descriptions: `Easy access to essential social amenities (regular electricity supply, good roads, recreational centers, shopping centers, health facilities, educational facilities etc.)`,
        },
        {
            id: 6,
            icon: "flaticon-high-five",
            descriptions: `Assurance of constant security You enter the estate through the Ghana Police and Staff Command College in Winneba with a police station just about a kilometer away`,
        },
        {
            id: 7,
            icon: "flaticon-high-five",
            descriptions: ` Excellent waste management services.`,
        },
        {
            id: 8,
            icon: "flaticon-high-five",
            descriptions: `Centralized air conditioning system.`,
        },
        {
            id: 9,
            icon: "flaticon-high-five",
            descriptions: `Smart homes with systems that can be controlled remotely.`,
        },
        {
            id: 10,
            icon: "flaticon-high-five",
            descriptions: `The estate is just a few minutes’ drive from the University of Education, Winneba campus which is a vibrant community close to our community. The university presents residents with many opportunities for higher education, business etc.`,
        },
        {
            id: 11,
            icon: "flaticon-high-five",
            descriptions: `The estate is within a serene environment without the hustle and bustle of the city centers.`,
        },
        {
            id: 12,
            icon: "flaticon-high-five",
            descriptions: `The estate is about an hour’s drive from the capital, Accra.`,
        },
        {
            id: 13,
            icon: "flaticon-high-five",
            descriptions: `As a resident of the estate, you get to enjoy the beauty of local fishermen pulling their nets amidst singing.
            `,
        },
        {
            id: 14,
            icon: "flaticon-high-five",
            descriptions: `The estate will have a village for local fishermen with excellent amenities. We are focused on not displacing the local fishermen so they can continue to engage in fishing to support their livelihoods. When you get a home from our estate, you will be contributing to providing homes for locals who cannot afford decent homes.`,
        },

    ];

    return (
        <>
            {whyHGContent.map((item) => (
                {/* <div className="col-md-6 col-lg-3 col-xl-3" key={item.id}>
                    <div className={`why_chose_us ${style}`}>
                        <div className="details">
                            <p>{item.descriptions}</p>
                        </div>
                    </div>
                </div> */},

                <div className="col-lg-4 offset-lg-4" key={item.id}>
                    <div className="main-title text-center">
                        <ul>
                            <li>
                                <span className="ui-active flaticon-angle-arrow-down"></span>
                                <br/>
                                <span>{item.descriptions}</span>
                            </li>
                        </ul>
                    </div>
                </div>

            ))}
        </>
    );
}

// export default WhyHammahGreen;