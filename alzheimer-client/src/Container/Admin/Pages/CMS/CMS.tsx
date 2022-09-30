import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import EditHome from "./EditHome/EditHome";
import EditAbout from "./EditAbout/EditAbout";
import EditJoins from "./EditJoins/EditJoins";
import EditPrivacy from "./EditPrivacy/EditPrivacy";
import EditFooter from "./EditFooter/EditFooter";
import { PAGE } from "../../../../interfaces/index";

// PAGE.home
const CMS = () => {
  const [key, setKey] = useState<string>('');
  return (
    <div className="page_responsive">
      <h3>CMS</h3>

      <Tabs
        activeKey={key}
        onSelect={(k) => {
          setKey(k!);
        }}
        className="mb-3 tabs"
      >
        <Tab eventKey={PAGE.home} title={PAGE.home} className={"w-100"}>
          <EditHome />
        </Tab>

        <Tab eventKey={PAGE.about} title={PAGE.about} className={"w-100"}>
          <EditAbout />
        </Tab>

        <Tab eventKey={PAGE.joins} title={PAGE.joins} className={"w-100"}>
          <EditJoins />
        </Tab>

        <Tab eventKey={PAGE.privacy} title={PAGE.privacy} className={"w-100"}>
          <EditPrivacy />
        </Tab>

        <Tab eventKey={PAGE.footer} title={PAGE.footer} className={"w-100"}>
          <EditFooter />
        </Tab>
      </Tabs>
    </div>
  );
};

export default CMS;
