// IMPORTS
const chalk = require('chalk');
const fs = require('fs');

// DEFINE
const crateNewComponent = async (args) => {
  // SETUP
  const type = args[2];
  const { log } = console;
  const component = args[3];
  const typeList = ['atom', 'molecule', 'organism', 'template'];
  const nameListPath = './factory/components';
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

  // PREPARE
  const TYPE = type.toUpperCase();
  const exportPath = 'src/index.js';
  const modelPath = 'factory/model';
  const destPath = `src/${type}s`;
  const documentPath = 'src/index.mdx';
  const componentPath = `${destPath}/${component}`;
  const Component = component.charAt(0).toUpperCase() + component.slice(1);
  const Type = type.charAt(0).toUpperCase() + type.slice(1);
  const success = message => log(chalk.bgGreen.bold(' SUCCESS '), chalk.green(message));
  const error = (message, debug) => log(chalk.bgRed.bold(' ERROR '), chalk.red(message), '\n', debug);

  // CMDs

  // create directory
  try {
    await fs.mkdirSync(componentPath);
    success(`${chalk.bold(component)} folder created on ${destPath}`, '✓');
  } catch (err) {
    return error(`Error creating diretory ${chalk.bold(component)} on ${destPath}`, err);
  }

  // save component name on list
  try {
    nameList.push(component);
    nameList = JSON.stringify(nameList);
    fs.writeFileSync(nameListPath, nameList, 'utf-8');
  } catch (err) {
    return error(`Error saving ${chalk.bold(component)} name`, err);
  }

  // copy each model file to the new directory
  try {
    // read model folder
    const folder = fs.readdirSync(modelPath);
    folder.forEach(async (file) => {
      const fileName = {
        test: `${component}.spec.js`,
        doc: `${component}.mdx`,
        index: 'index.js',
      };
      try {
        // copy files
        const filePath = `${componentPath}/${fileName[file]}`;
        await fs.copyFileSync(`${modelPath}/${file}`, filePath);
        // read file content
        try {
          const content = fs.readFileSync(filePath, 'utf-8');
          // edit file contentType
          const withComponent = content.replace(/__COMPONENT__/g, Component);
          const withPath = withComponent.replace(/__component__/g, component);
          const editedContent = withPath.replace(/__Type__/g, Type);
          try {
            // write new content on file
            await fs.writeFileSync(filePath, editedContent, 'utf-8');
            success(`${filePath} prepared`);
          } catch (err) {
            return error(`Exporting ${component} to module`, err);
          }
        } catch (err) {
          return error(`Error preparing file ${filePath}`, err);
        }
        return success(`${fileName[file]} file created on ${componentPath}`);
      } catch (err) {
        return error(`Error coping file ${fileName[file]} to ${componentPath}`, err);
      }
    });
  } catch (err) {
    return error(`Error reading directory ${chalk.bold(component)}`, err);
  }

  // read export file
  try {
    const exportsContent = fs.readFileSync(exportPath, 'utf-8');
    // edit content to import file on right list
    const withImport = exportsContent.replace(
      `// ${TYPE}S`,
      `// ${TYPE}S\nimport ${Component} from './atoms/${component}';`,
    );
    // edit content to export file to module
    const withExport = withImport.replace(
      '// COMPONENTS',
      `// COMPONENTS\n  ${Component},`,
    );

    // add new content on export file
    try {
      await fs.writeFileSync(exportPath, withExport, 'utf-8');
      success(`${Component} exported on ${exportPath}`);
    } catch (err) {
      return error(`Exporting ${component} to module`, err);
    }
  } catch (err) {
    return error(`Exporting ${component} to module`, err);
  }


  // read index documentation
  try {
    const docsContent = fs.readFileSync(documentPath, 'utf-8');
    // edit content to import file on right list
    const withDoc = docsContent.replace(
      `## ${TYPE}S`,
      `## ${TYPE}S\n- [${Component}](/${component})`,
    );
    // add new content on export file
    try {
      await fs.writeFileSync(documentPath, withDoc, 'utf-8');
      success(`${Component} included on ${documentPath}`);
    } catch (err) {
      return error(`Writing ${component} on documentation index`, err);
    }
  } catch (err) {
    return error(`Exporting ${component} to module`, err);
  }

  // DONE
  return success('DONE');
};

// EXECUTE
crateNewComponent(process.argv);
