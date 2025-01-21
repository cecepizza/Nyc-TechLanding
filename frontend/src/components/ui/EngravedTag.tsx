import { EngravedTagContainer, EngravedTagItem } from "./EngravedTagCard";

const EngravedTag = () => {
  return (
    <EngravedTagContainer className="absolute top-9 right-0 z-10 mt-8 mr-6">
      <EngravedTagItem className="absolute top-3 right-3 shiny">
        <div
          className="p-3 rounded border-2 shadow-inner"
          style={{
            borderColor: "#003366",
            background: "#1a1a1a",
            boxShadow: "inset -2px -2px 5px #003366, inset 2px 2px 5px #000080",
            opacity: 0.8,
            padding: "6px 10px",
          }}
        >
          <span
            style={{
              color: "#b0c4de",
              textShadow:
                "0 1px 1px #000, 1px 0px 1px #000, -1px -1px 1px rgba(255, 255, 255, 0.2)",
              fontSize: "0.8rem",
              padding: "0 4px",
            }}
          >
            Built by:
          </span>{" "}
          <span
            style={{
              fontWeight: "bold",
              fontSize: "1.1rem",
              color: "#add8e6",
              textShadow:
                "0 1px 1px #000, 1px 0px 1px #000, -1px -1px 1px rgba(255, 255, 255, 0.2)",
            }}
          >
            FractalTech
          </span>
        </div>
      </EngravedTagItem>
    </EngravedTagContainer>
  );
};

export default EngravedTag;
