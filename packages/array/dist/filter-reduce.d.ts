export default function filterReduce<In, Out>(input: ArrayLike<In>, output: Out, filter: (acc: Out, item: In) => boolean, reduce: (acc: Out, item: In) => Out): Out;
