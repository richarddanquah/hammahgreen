// import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import agents from "../../../data/agents";
import { addAgentItemLength } from "../../../features/agent/agentSlice";

const Team = ({ allAgents }) => {
  const { name, category, city, listen } =
    useSelector((state) => state.agent) || {};
  const dispatch = useDispatch();

  // name
  const nameHandler = (item) =>
    item.name.toLowerCase().includes(name.toLowerCase());

  // category
  const categoryHandler = (item) =>
    item.type.toLowerCase().includes(category.toLowerCase());

  // city
  const cityHandler = (item) =>
    item.city.toLowerCase().includes(city.toLowerCase());

  let content =
    allAgents &&
    allAgents
      .slice(0, 16)
      // .filter(nameHandler)
      // .filter(categoryHandler)
      // .filter(cityHandler)
      // .filter((item) =>
      //     item.noOfListings.toLowerCase().includes(listen.toLowerCase())
      // )
      .map((item) => (
        <div className="col-lg-12" key={item._id}>
          <div className="feat_property list style2 agent rounded-4 border-0 shadow-sm">
            <div className="thumb rounded-4">
              {/* <Link href={`/agent-details/${item._id}`}> */}
              <a>
                <img
                  className="img-whp"
                  src={
                    item.userImg
                      ? item.userImg
                      : "/assets/images/profileImgs/avatar.png"
                  }
                  alt="bh1.jpg"
                />
              </a>
              {/* </Link> */}

              {/* <div className="thmb_cntnt">
                <ul className="tag mb0">
                  <li className="list-inline-item dn"></li>
                  <li className="list-inline-item">
                    <a href="#">{item.noOfListings} Listings</a>
                  </li>
                </ul>
              </div> */}

            </div>
            {/* End .thumb */}

            <div className="details align-self-center">
              <div className="tc_content">
                <h4 className="m-0"> 
                  {/* <Link href={`/agent-details/${item._id}`}> */}
                  <a>
                    {item.fname} {item.lname}
                  </a>
                  {/* </Link> */}
                </h4>
                <p className="text-thm">{item.position}</p>
                <ul className="prop_details mb0">
                  <li>
                    <a href="#"><i className="fa fa-at"></i>{" "} {item.email}</a>
                  </li>
                  <li>
                    <a href="#"><i className="fa fa-phone"></i>{" "} {item.mobile}</a>
                  </li>
                </ul>
              </div>
              {/* End .tc_content */}

              <div className="fp_footer">
                {/* <ul className="fp_meta float-start mb0">
                  {item.socialList.map((social, i) => (
                    <li className="list-inline-item" key={i}>
                      <a
                        href={social.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className={`fa ${social.icon}`}></i>
                      </a>
                    </li>
                  ))}
                </ul> */}
                {/* <div className="fp_pdate float-end ">
                  <Link href={`/agent-details/${item._id}`}>
                    <a className="text-thm">
                      View My Listings <i className="fa fa-angle-right"></i>
                    </a>
                  </Link>
                </div> */}
              </div>
              {/* End .fp_footer */}
            </div>
          </div>
        </div>
      ));

  // agent item length
  useEffect(() => {
    dispatch(addAgentItemLength(content.length));
  }, [dispatch, addAgentItemLength, content]);
  return <>{content}</>;
};

export default Team;
