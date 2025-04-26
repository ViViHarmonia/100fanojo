const fsPromises = require("fs/promises");

main();
async function main() {
  const resultado = [];
  try {
    const rootpath = "/pics";
    const directorios = await fsPromises.readdir(rootpath);
    for (let directory of directorios) {
      const subdirectorios = await fsPromises.readdir(
        rootpath + "/" + directory
      );
      for (let subdirectory of subdirectorios) {
        if (subdirectory.includes(".")) {
          resultado.push({
            url: `pics/${directory}/${subdirectory}/`,
            label: "",
            tags: [],
            chars: "",
          });
        } else {
          const subsubdirectorios = await fsPromises.readdir(
            rootpath + "/" + directory + "/" + subdirectory
          );
          for (let subsubdirectory of subsubdirectorios) {
            if (subsubdirectory.includes(".")) {
              resultado.push({
                url: `pics/${directory}/${subdirectory}/${subsubdirectory}`,
                label: "",
                tags: [],
                chars: "",
              });
            }
          }
        }
      }
      console.log(resultado);
      await fsPromises.writeFile("json", JSON.stringify(resultado));
    }
  } catch (err) {
    console.error(err);
  }
}
