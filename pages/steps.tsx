import { useMultistep } from "@/hooks/useMultiStep";

export default function Steps() {
  const { step, componentIndex, steps, next, back } = useMultistep([<>One</>, <>Two</>]);

  const isFirstStep = componentIndex === 0;

  return (
    <div className="mt-6 border border-black rounded-md p-4 w-1/2 mx-auto">
      <h1>Multi Step Form</h1>

      <p>
        {componentIndex + 1}/{steps.length}
      </p>

      <div className="flex items-center justify-center my-5">{step}</div>

      <div className="flex items-center justify-center space-x-2">
        <button
          onClick={back}
          disabled={isFirstStep ? true : false}
          className="border border-black px-3 py-1 rounded-lg"
        >
          Back
        </button>
        <button
          onClick={next}
          disabled={!isFirstStep ? true : false}
          className="border border-black px-3 py-1 rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
}
