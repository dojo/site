# Sample Tutorial

## Metadata
[Metadata overview="Learn how to create and style custom widgets in Dojo.", topic="widgets"]

## Aside
[Aside title="Mandatory object for properties"]
The 2nd argument of the `w()` function is mandatory even you have no properties to pass in. This is to ensure the correct type guarding for all widgets in TypeScript.
[/Aside]

## Task
[Task]Create a new root node for the application[/Task]

## Instruction
[Instruction]
Add these lines at the top of the file.
[/Instruction]

## CodeBlock from file
[CodeBlock path=tutorial-2-finished/src/widgets/App.tsx, language=tsx]

## CodeBlock from file with region
[CodeBlock path=tutorial-2-finished/src/widgets/App.tsx, region=render, language=tsx]

## Standard code fences
```ts
render() {
	return v('div', [ 'some inline code' ]);
}
```
