import { Command } from "commander";

const program = new Command();

program.option("-e, --enviroment <enviroment>", "enviroment", "development");

program.parse(process.argv);

export default program;
