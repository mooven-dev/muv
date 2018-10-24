// IMPORTS
const chalk = require('chalk');
const fs = require('fs');

// DEFINE
const crateNewComponent = (args) => {
  // SETUP
  const type = args[2];
  const { log } = console;
  const component = args[3];
  const typeList = ['atom', 'molecule', 'organism', 'template'];
  const nameListPath = './factory/components.txt';
  let nameList = fs.readFileSync(nameListPath, 'utf8');
  nameList = nameList.replace(/'/g, '"');
  nameList = JSON.parse(nameList);

  // help message
  const helpMessage = (cmderr = '') => {
    const message = 'yarn muv <type> <name>';
    return log(
      chalk.bgRed.bold(' ERROR '),
      chalk.red(cmderr),
      '\n',
      chalk.black.bgYellow.bold(' HELP '),
      chalk.yellow(message),
    );
  };

  // VALIDATIONS

  // comand must have 4 args
  if (args.length !== 4) {
    return helpMessage('comand must have 4 args');
  }

  // type must be one of the list
  if (!typeList.filter(item => item === type).length) {
    return helpMessage(`type "${type}" must be one of: atom, molecule, organism, template`);
  }

  // component name can't be the same of a type
  if (component === undefined || type === component) {
    return helpMessage('component name can\'t be the same of a type');
  }

  // component name must be unique
  if (nameList.filter(item => item === component).length) {
    return helpMessage('component name must be unique');
  }

  // save component name on list
  nameList.push(component);
  nameList = JSON.stringify(nameList);
  fs.writeFileSync(nameListPath, nameList, 'utf-8');

  // PREPARE
  const exportPath = 'src/index.js';
  const modelPath = 'factory/model';
  const destPath = `src/${type}s`;
  const documentPath = 'src/index.mdx';
  const componentPath = `${destPath}/${component}`;

  // log messages
  const success = message => log(chalk.bgGreen.bold(' SUCCESS '), chalk.green(message));
  const error = (message, debug) => log(chalk.bgRed.bold(' ERROR '), chalk.red(message), '\n', debug);

  // CMD
  return fs.mkdir(componentPath, {}, (errmk) => {
    // create directory
    if (errmk) return error(`Error creating diretory ${chalk.bold(component)} on ${destPath}`, errmk);
    success(`${chalk.bold(component)} folder created on ${destPath}`, '✓');
    fs.readdir(modelPath, (errread, files) => {
      // read files from model
      if (errread) return error(`Error reading directory ${chalk.bold(component)}`, errread);
      return files.forEach((file) => {
        // copy each model file to the new directory
        const fileName = (file === 'index.js') ? file : component + file;
        fs.copyFile(`${modelPath}/${file}`, `${componentPath}/${fileName}`, (errcopy) => {
          if (errcopy) return error(`Error coping file ${fileName} to ${componentPath}`, errcopy);
          return success(`${fileName} file created on ${componentPath}`);
        });
      });
    });

    // read export file
    fs.readFile(exportPath, 'utf-8', (readerr, content) => {
      if (readerr) return error(`Exporting ${component} to module`, readerr);
      const Component = component.charAt(0).toUpperCase() + component.slice(1);
      const TYPE = type.toUpperCase();

      // edit content to import file on right list
      const withImport = content.replace(
        `// ${TYPE}S`,
        `// ${TYPE}S\nimport ${Component} from './atoms/${component}';`,
      );

      // edit content to export file to module
      const withExport = withImport.replace(
        '// COMPONENTS',
        `// COMPONENTS\n  ${Component},`,
      );

      // add new content on export file
      fs.writeFile(exportPath, withExport, 'utf-8', (writeerr) => {
        if (writeerr) return error(`Exporting ${component} to module`, readerr);
        return success(`${Component} exported on ${exportPath}`);
      });
      return true;
    });

    // read index documentation
    fs.readFile(documentPath, 'utf-8', (readerr, content) => {
      if (readerr) return error(`Exporting ${component} to module`, readerr);
      const Component = component.charAt(0).toUpperCase() + component.slice(1);
      const TYPE = type.toUpperCase();
      // edit content to import file on right list
      const withDoc = content.replace(
        `## ${TYPE}S`,
        `## ${TYPE}S\n- [${Component}](/${component})`,
      );

      // add new content on export file
      fs.writeFile(documentPath, withDoc, 'utf-8', (writeerr) => {
        if (writeerr) return error(`Writing ${component} on documentation index`, readerr);
        return success(`${Component} included on ${documentPath}`);
      });
      return true;
    });
    return true;
  });
};

// EXECUTE
crateNewComponent(process.argv);
