export default function WeProvide({ style = "" }) {
    const weProvideContent = [
        {
            id: 1,
            icon: "flaticon-house",
            title: "Homes for individuals and corporate bodies.",
            descriptions: `Aliquam dictum elit vitae mauris facilisis at dictum urna
            dignissim donec vel lectus vel felis.`,
        },
        {
            id: 2,
            icon: "flaticon-house-2",
            title: "Home Maintenance Services.",
            descriptions: `Aliquam dictum elit vitae mauris facilisis at dictum urna
            dignissim donec vel lectus vel felis.`,
        },
        {
            id: 3,
            icon: "flaticon-house",
            title: "Advisory services on home acquisition.",
            descriptions: `Aliquam dictum elit vitae mauris facilisis at dictum urna
            dignissim donec vel lectus vel felis.`,
        },
    ]

    return (
        <>
            {weProvideContent.map((item) => (
                <div className="col-md-6 col-lg-4 col-xl-4" key={item.id}>
                    <div className={`why_chose_us ${style}`}>
                        <div className="icon">
                            <span className={item.icon}></span>
                        </div>
                        <div className="details">
                            <h4>{item.title}</h4>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}