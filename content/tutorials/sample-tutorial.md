# Sample Tutorial

## Aside
[Aside title="Mandatory object for properties"]
The 2nd argument of the `w()` function is mandatory even you have no properties to pass in. This is to ensure the correct type guarding for all widgets in TypeScript.
[/Aside]

## Task
[Alert]
Create a new root node for the application
[/Alert]

## Instruction
[Alert type="success"]
Add these lines at the top of the file.
[/Alert]

## CodeBlock from file
[CodeBlock path=tutorial-2-finished/src/widgets/App.tsx, language=tsx]

## CodeBlock from file with region
[CodeBlock path=tutorial-2-finished/src/widgets/App.tsx, region=render, language=tsx]

## Standard code fences
```tsx
render() {
	return (<div>some inline code</div>);
}
```

[Alert]
Info alert
[/Alert]

[Alert type="success"]
Success alert
[/Alert]

[Alert type="warning"]
Warning alert
[/Alert]

[Alert type="danger"]
Danger alert
[/Alert]
