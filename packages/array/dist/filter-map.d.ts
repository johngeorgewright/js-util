export default function filterMap<In, FilteredIn extends In, Out>(input: ArrayLike<In>, filter: (item: In) => item is FilteredIn, map: (item: FilteredIn) => Out): Out[];
