import React, { useEffect } from "react";

const DocuSignComponent = () => {
  useEffect(() => {
    const initializeDocuSign = async () => {
      try {
        const docusign = await window.DocuSign.loadDocuSign(
          "522ac2b1-81d3-42ba-93a6-fac5ef023033"
        );
        const response = await fetch("/api/docusign", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const { url } = await response.json();

        const signing = docusign.signing({
          url: url,
          displayFormat: "focused",
          style: {
            branding: {
              primaryButton: {
                backgroundColor: "#333",
                color: "#fff",
              },
            },
            signingNavigationButton: {
              finishText: "You have finished the document! Hooray!",
              position: "bottom-center",
            },
          },
        });

        signing.on("ready", (event) => {
          console.log("UI is rendered");
        });

        signing.on("sessionEnd", (event) => {
          console.log("sessionend", event);
        });

        signing.mount("#agreement");
      } catch (ex) {
        console.error("Error initializing DocuSign", ex);
      }
    };

    initializeDocuSign();
  }, []);

  return (
    <div className="main">
      <nav className="navbar">Hello World</nav>
      <div className="docusign-agreement" id="agreement"></div>
    </div>
  );
};

export default DocuSignComponent;
