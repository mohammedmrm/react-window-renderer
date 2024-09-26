import BasicUsageExample from "./tests/examples/basic";

function App() {
  return (
    <div
      style={{
        display: "grid",
        flexFlow: "column",
        gridColumn: 1,
        width: "100%",
        justifyContent: "center",
      }}
    >
      <h1>React Window Renderer Basic Example</h1>
      <BasicUsageExample />
    </div>
  );
}

export default App;
