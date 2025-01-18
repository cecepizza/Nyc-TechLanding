import { EngravedTagContainer, EngravedTagItem } from "./EngravedTagCard";

const EngravedTag = () => {
  return (
    <EngravedTagContainer className="absolute top-0 right-0 z-10 mt-2 mr-5">
      <EngravedTagItem className="absolute top-2 right-2">
        <div
          className="p-2 rounded border-2 shadow-inner"
          style={{
            borderColor: "#003366",
            background: "#1a1a1a",
            boxShadow: "inset -2px -2px 5px #003366, inset 2px 2px 5px #000080",
            opacity: 0.7,
          }}
        >
          <span
            style={{
              color: "#b0c4de",
              textShadow:
                "0 1px 1px #000, 1px 0px 1px #000, -1px -1px 1px rgba(255, 255, 255, 0.2)",
              fontSize: "0.8rem",
            }}
          >
            Built by:
          </span>{" "}
          <span
            style={{
              fontWeight: "bold",
              fontSize: "1rem",
              color: "#add8e6",
              textShadow:
                "0 1px 1px #000, 1px 0px 1px #000, -1px -1px 1px rgba(255, 255, 255, 0.2)",
            }}
          >
            Fractal Tech
          </span>
        </div>
      </EngravedTagItem>
    </EngravedTagContainer>
  );
};

export default EngravedTag;
