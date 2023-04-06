import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import Header from "../common/header/DefaultHeader";
import MobileMenu from "../common/header/MobileMenu";
import BreadCrumbBanner from "./CityBreadCrumbBanner";
import BannerImage from "../common/BannerImage";

const index = () => {
    return (
        <>
            {/* <!-- Main Header Nav --> */}
            <Header />

            {/* <!--  Mobile Menu --> */}
            <MobileMenu />

            {/* <!-- Inner Page Breadcrumb --> */}
            <BreadCrumbBanner />

            <section className="container">
                <div className="row mt20 mb20">
                    <div className="col-lg-8 offset-lg-0">
                        <div className="about_content">
                            <p>
                                The city of Winneba holds a special place in the history of Ghana, as it was the originally intended capital of the country. Known for its mild ocean breeze and gorgeous water views, Winneba is unique in its sunny and relaxed vibe and worry-free essence. This city is characterized by quality infrastructure and a proximity to both Accra (the nation&apos;s capital) and the historic tourist attractions of the Cape Coast castles. Commute times to Accra are less than an hour to Accra when not travelling during rush hour and on Saturdays. These times are set to improve not only commute times but property values as the coming highway expansion begins!
                            </p>

                            <h4 className="large">WINNEBA – Socio-economic Make-up and Education</h4>

                            <p>
                                Winneba is a town and the capital of Effutu Municipal District in Central Region of South Ghana. Traditionally known as Simpa, it is a historic fishing port in south Ghana, lying on the south coast, 140 kilometres (90 mi) east of Cape Coast.
                            </p>

                            <p>
                                Winneba has a population of 55,331, which is generally a youthful population with most people being below the age of 45 years. The daily minimum wage in Ghana, effective January 2023 is GHC14.88 (US$1.42). About a third of the residents in Winneba earn just a little below the minimum wage. Averagely, residents of Winneba are low to middle income earners with just a few high-income earners. This is rapidly changing as middle to high-earning locals and foreigners are seeking better value outside of the main city Accra and are searching for picturesque views that are sure to greatly appreciate.
                            </p>

                            <p>
                                The people within the community are a warm and welcoming people. This accounts for the high sense of communal living within the community.
                            </p>

                            <h4 className="large">Sanitation and transport</h4>

                            <p>
                                Winneba is generally clean in comparison with other towns in Ghana. The town boasts clean roads and neighborhoods. There is a general sense of cleanliness among the populace. It is common to see residents sweep and clean their houses and surroundings each morning. There are waste collection companies that constantly go around the community on given days to collect waste.
                            </p>

                            <p>
                                Transportation within the area is generally smooth. There are taxi cabs to take commuters wherever they want within the community. The roads within the community are generally in good shape.
                            </p>

                            <BannerImage img = "../assets/images/city/UEW.jpeg"/>

                            <br />

                            <h4 className="large">Education</h4>

                            <p>
                                There are many educational institutions within the Winneba enclave, from basic schools, through high school to the tertiary level. These institutions are both public and private. Some notable educational institutions in Winneba are <b>University of Education, Winneba</b>, Command and Staff Training School of Ghana Police, Winneba Community Nursing Training College, Winneba Senior High School, Winneba School of Business and Winneba Vocational Training Institute.
                            </p>

                            <p>
                                The University of Education, Winneba is one of the main public tertiary institutions in Ghana. The University of Education, Winneba (UEW) is a university in Winneba, Region of Ghana. It was established in 1992 by a government ordinance (PNDC Law 322) and with a relationship with the University of Cape Coast. Its main aim is to train teachers for the education system of Ghana. The University of Education, Winneba is charged with the responsibility of teacher education and producing professional educators to spearhead a new national vision of education aimed at redirecting Ghana&apos;s efforts along the path of rapid economic and social development. The University of Education, Winneba is expected to play a leading role in Ghana&apos;s drive to produce scholars whose knowledge would be fully responsive to the realities and exigencies of contemporary Ghana.
                            </p>

                            <p>
                                The university has twenty-nine academic departments and centers, seven faculties. It also has 18 distance education regional study centers throughout Ghana.
                            </p>

                            <p>
                                In addition to three campuses in Winneba where its administrative office is located, the university has one extra campus in addition to over 20 study centers: The College of Languages Education – Ajumako Campus.
                            </p>

                            <p>
                                The Winneba Campus is the main campus of the university and is spread over three sites (North, Central and South) within the Effutu Municipality. The central administration of the university is located at the South Campus. UEW is a multi-campus, multi-site university. It has six campuses, three at Winneba and one at Ajumako in the Central Region of Ghana, and the other two at Kumasi and Mampong respectively, both in the Ashanti Region.
                            </p>

                            <p>
                                As a multi-campus, multi-site university with campuses and learning centres in other parts of the country UEW has six Faculties, one institute and two centres of the university provide programmes in the areas of Science and Mathematics Education, Technology and Business Education, Agriculture Education, Home Economics Education, Cultural Studies, Creative Arts Education, Guidance and Counselling and Educational Administration and Leadership. (Wikipedia)
                            </p>

                            <p>
                                The presence of the University in Winneba has opened the town to so many opportunities especially for businesses.
                            </p>

                            <h4 className="large">Aboakyire Festival</h4>

                            <BannerImage img = "../assets/images/city/aboakyire-festival.jpeg"/>

                            <i>Aboakyire</i> • <span><b>Photo credit: The Eye of Photography</b></span>

                            <br />
                            <br />

                            <p>
                                The Yenku Forest Reserve serves as the traditional hunting grounds of the Effutu people during the ‘Aboakyire Festival’ (Deer Hunting) which is usually celebrated between May and June each year. The Yenku Forest has been traditionally conserved for over 300 years by the people Efuttu Traditional Area to protect the bushbuck population, because of the important role it plays in their annual festival. The inability to capture a live deer during the ‘Aboakyire’ is believed to spell doom for the people of Winneba.
                            </p>

                            <p>
                                The Aboakyire festival brings together thousands of indigenes and visitors every year. The festival provides an opportunity to celebrate the local culture of the Effutu people especially for non-indigenes.
                            </p>

                        </div>
                    </div>
                </div>
            </section>


            {/* <!-- Our Footer --> */}
            <section className="footer_one">
                <div className="container">
                    <div className="row">
                        <Footer />
                    </div>
                </div>
            </section>

            {/* <!-- Our Footer Bottom Area --> */}
            <section className="footer_middle_area pt40 pb40">
                <div className="container">
                    <CopyrightFooter />
                </div>
            </section>

        </>
    )
}

export default index;
