{
  "errors": [],
  "warnings": [],
  "version": "3.5.5",
  "hash": "dcee3bcd6e5647931f0d",
  "publicPath": "",
  "assetsByChunkName": {
    "app3": "app3.nohoist.js"
  },
  "assets": [
    {
      "name": "app3.nohoist.js",
      "size": 4694,
      "chunks": [
        0
      ],
      "chunkNames": [
        "app3"
      ]
    }
  ],
  "filteredAssets": 0,
  "entrypoints": {
    "app3": {
      "chunks": [
        0
      ],
      "assets": [
        "app3.nohoist.js"
      ]
    }
  },
  "chunks": [
    {
      "id": 0,
      "rendered": true,
      "initial": true,
      "entry": true,
      "extraAsync": false,
      "size": 458,
      "names": [
        "app3"
      ],
      "files": [
        "app3.nohoist.js"
      ],
      "hash": "1b675de30f155db1d3e6",
      "parents": [],
      "modules": [
        {
          "id": 0,
          "identifier": "/Users/rye/scm/fmd/formidable-playbook/node_modules/babel-loader/lib/index.js??ref--0!/Users/rye/scm/fmd/formidable-playbook/examples/frontend/src/es6/app3.js",
          "name": "./examples/frontend/src/es6/app3.js",
          "index": 0,
          "index2": 3,
          "size": 102,
          "cacheable": true,
          "built": true,
          "optional": false,
          "prefetched": false,
          "chunks": [
            0
          ],
          "assets": [],
          "issuer": null,
          "issuerId": null,
          "issuerName": null,
          "failed": false,
          "errors": 0,
          "warnings": 0,
          "reasons": [],
          "usedExports": true,
          "providedExports": [],
          "optimizationBailout": [],
          "depth": 0,
          "source": "import { red } from \"./util-2\";\n\ndocument.querySelector(\"#content\").innerHTML += red(\"app3\", \"App 3\");"
        },
        {
          "id": 1,
          "identifier": "/Users/rye/scm/fmd/formidable-playbook/node_modules/babel-loader/lib/index.js??ref--0!/Users/rye/scm/fmd/formidable-playbook/examples/frontend/src/es6/util-2.js",
          "name": "./examples/frontend/src/es6/util-2.js",
          "index": 1,
          "index2": 2,
          "size": 62,
          "cacheable": true,
          "built": true,
          "optional": false,
          "prefetched": false,
          "chunks": [
            0
          ],
          "assets": [],
          "issuer": "/Users/rye/scm/fmd/formidable-playbook/node_modules/babel-loader/lib/index.js??ref--0!/Users/rye/scm/fmd/formidable-playbook/examples/frontend/src/es6/app3.js",
          "issuerId": 0,
          "issuerName": "./examples/frontend/src/es6/app3.js",
          "failed": false,
          "errors": 0,
          "warnings": 0,
          "reasons": [
            {
              "moduleId": 0,
              "moduleIdentifier": "/Users/rye/scm/fmd/formidable-playbook/node_modules/babel-loader/lib/index.js??ref--0!/Users/rye/scm/fmd/formidable-playbook/examples/frontend/src/es6/app3.js",
              "module": "./examples/frontend/src/es6/app3.js",
              "moduleName": "./examples/frontend/src/es6/app3.js",
              "type": "harmony import",
              "userRequest": "./util-2",
              "loc": "1:0-31"
            }
          ],
          "usedExports": [
            "red"
          ],
          "providedExports": [
            "red",
            "blue",
            "two"
          ],
          "optimizationBailout": [],
          "depth": 1,
          "source": "export { red, blue } from \"./util-1\";\n\nexport var two = \"two\";"
        },
        {
          "id": 2,
          "identifier": "/Users/rye/scm/fmd/formidable-playbook/node_modules/babel-loader/lib/index.js??ref--0!/Users/rye/scm/fmd/formidable-playbook/examples/frontend/src/es6/util-1.js",
          "name": "./examples/frontend/src/es6/util-1.js",
          "index": 2,
          "index2": 1,
          "size": 60,
          "cacheable": true,
          "built": true,
          "optional": false,
          "prefetched": false,
          "chunks": [
            0
          ],
          "assets": [],
          "issuer": "/Users/rye/scm/fmd/formidable-playbook/node_modules/babel-loader/lib/index.js??ref--0!/Users/rye/scm/fmd/formidable-playbook/examples/frontend/src/es6/util-2.js",
          "issuerId": 1,
          "issuerName": "./examples/frontend/src/es6/util-2.js",
          "failed": false,
          "errors": 0,
          "warnings": 0,
          "reasons": [
            {
              "moduleId": 1,
              "moduleIdentifier": "/Users/rye/scm/fmd/formidable-playbook/node_modules/babel-loader/lib/index.js??ref--0!/Users/rye/scm/fmd/formidable-playbook/examples/frontend/src/es6/util-2.js",
              "module": "./examples/frontend/src/es6/util-2.js",
              "moduleName": "./examples/frontend/src/es6/util-2.js",
              "type": "harmony import",
              "userRequest": "./util-1",
              "loc": "1:0-37"
            }
          ],
          "usedExports": [
            "red"
          ],
          "providedExports": [
            "red",
            "blue",
            "one"
          ],
          "optimizationBailout": [],
          "depth": 2,
          "source": "export { red, blue } from \"./util\";\n\nexport var one = \"one\";"
        },
        {
          "id": 3,
          "identifier": "/Users/rye/scm/fmd/formidable-playbook/node_modules/babel-loader/lib/index.js??ref--0!/Users/rye/scm/fmd/formidable-playbook/examples/frontend/src/es6/util.js",
          "name": "./examples/frontend/src/es6/util.js",
          "index": 3,
          "index2": 0,
          "size": 234,
          "cacheable": true,
          "built": true,
          "optional": false,
          "prefetched": false,
          "chunks": [
            0
          ],
          "assets": [],
          "issuer": "/Users/rye/scm/fmd/formidable-playbook/node_modules/babel-loader/lib/index.js??ref--0!/Users/rye/scm/fmd/formidable-playbook/examples/frontend/src/es6/util-1.js",
          "issuerId": 2,
          "issuerName": "./examples/frontend/src/es6/util-1.js",
          "failed": false,
          "errors": 0,
          "warnings": 0,
          "reasons": [
            {
              "moduleId": 2,
              "moduleIdentifier": "/Users/rye/scm/fmd/formidable-playbook/node_modules/babel-loader/lib/index.js??ref--0!/Users/rye/scm/fmd/formidable-playbook/examples/frontend/src/es6/util-1.js",
              "module": "./examples/frontend/src/es6/util-1.js",
              "moduleName": "./examples/frontend/src/es6/util-1.js",
              "type": "harmony import",
              "userRequest": "./util",
              "loc": "1:0-35"
            }
          ],
          "usedExports": [
            "red"
          ],
          "providedExports": [
            "red",
            "blue"
          ],
          "optimizationBailout": [],
          "depth": 3,
          "source": "export var red = function red(id, msg) {\n  return \"<h1 id=\\\"\" + id + \"\\\" style=\\\"color: red\\\">\" + msg + \"</h1>\";\n};\nexport var blue = function blue(id, msg) {\n  return \"<h1 id=\\\"\" + id + \"\\\" style=\\\"color: blue\\\">\" + msg + \"</h1>\";\n};"
        }
      ],
      "filteredModules": 0,
      "origins": [
        {
          "moduleId": 0,
          "module": "/Users/rye/scm/fmd/formidable-playbook/node_modules/babel-loader/lib/index.js??ref--0!/Users/rye/scm/fmd/formidable-playbook/examples/frontend/src/es6/app3.js",
          "moduleIdentifier": "/Users/rye/scm/fmd/formidable-playbook/node_modules/babel-loader/lib/index.js??ref--0!/Users/rye/scm/fmd/formidable-playbook/examples/frontend/src/es6/app3.js",
          "moduleName": "./examples/frontend/src/es6/app3.js",
          "loc": "",
          "name": "app3",
          "reasons": []
        }
      ]
    }
  ],
  "modules": [
    {
      "id": 0,
      "identifier": "/Users/rye/scm/fmd/formidable-playbook/node_modules/babel-loader/lib/index.js??ref--0!/Users/rye/scm/fmd/formidable-playbook/examples/frontend/src/es6/app3.js",
      "name": "./examples/frontend/src/es6/app3.js",
      "index": 0,
      "index2": 3,
      "size": 102,
      "cacheable": true,
      "built": true,
      "optional": false,
      "prefetched": false,
      "chunks": [
        0
      ],
      "assets": [],
      "issuer": null,
      "issuerId": null,
      "issuerName": null,
      "failed": false,
      "errors": 0,
      "warnings": 0,
      "reasons": [],
      "usedExports": true,
      "providedExports": [],
      "optimizationBailout": [],
      "depth": 0,
      "source": "import { red } from \"./util-2\";\n\ndocument.querySelector(\"#content\").innerHTML += red(\"app3\", \"App 3\");"
    },
    {
      "id": 1,
      "identifier": "/Users/rye/scm/fmd/formidable-playbook/node_modules/babel-loader/lib/index.js??ref--0!/Users/rye/scm/fmd/formidable-playbook/examples/frontend/src/es6/util-2.js",
      "name": "./examples/frontend/src/es6/util-2.js",
      "index": 1,
      "index2": 2,
      "size": 62,
      "cacheable": true,
      "built": true,
      "optional": false,
      "prefetched": false,
      "chunks": [
        0
      ],
      "assets": [],
      "issuer": "/Users/rye/scm/fmd/formidable-playbook/node_modules/babel-loader/lib/index.js??ref--0!/Users/rye/scm/fmd/formidable-playbook/examples/frontend/src/es6/app3.js",
      "issuerId": 0,
      "issuerName": "./examples/frontend/src/es6/app3.js",
      "failed": false,
      "errors": 0,
      "warnings": 0,
      "reasons": [
        {
          "moduleId": 0,
          "moduleIdentifier": "/Users/rye/scm/fmd/formidable-playbook/node_modules/babel-loader/lib/index.js??ref--0!/Users/rye/scm/fmd/formidable-playbook/examples/frontend/src/es6/app3.js",
          "module": "./examples/frontend/src/es6/app3.js",
          "moduleName": "./examples/frontend/src/es6/app3.js",
          "type": "harmony import",
          "userRequest": "./util-2",
          "loc": "1:0-31"
        }
      ],
      "usedExports": [
        "red"
      ],
      "providedExports": [
        "red",
        "blue",
        "two"
      ],
      "optimizationBailout": [],
      "depth": 1,
      "source": "export { red, blue } from \"./util-1\";\n\nexport var two = \"two\";"
    },
    {
      "id": 2,
      "identifier": "/Users/rye/scm/fmd/formidable-playbook/node_modules/babel-loader/lib/index.js??ref--0!/Users/rye/scm/fmd/formidable-playbook/examples/frontend/src/es6/util-1.js",
      "name": "./examples/frontend/src/es6/util-1.js",
      "index": 2,
      "index2": 1,
      "size": 60,
      "cacheable": true,
      "built": true,
      "optional": false,
      "prefetched": false,
      "chunks": [
        0
      ],
      "assets": [],
      "issuer": "/Users/rye/scm/fmd/formidable-playbook/node_modules/babel-loader/lib/index.js??ref--0!/Users/rye/scm/fmd/formidable-playbook/examples/frontend/src/es6/util-2.js",
      "issuerId": 1,
      "issuerName": "./examples/frontend/src/es6/util-2.js",
      "failed": false,
      "errors": 0,
      "warnings": 0,
      "reasons": [
        {
          "moduleId": 1,
          "moduleIdentifier": "/Users/rye/scm/fmd/formidable-playbook/node_modules/babel-loader/lib/index.js??ref--0!/Users/rye/scm/fmd/formidable-playbook/examples/frontend/src/es6/util-2.js",
          "module": "./examples/frontend/src/es6/util-2.js",
          "moduleName": "./examples/frontend/src/es6/util-2.js",
          "type": "harmony import",
          "userRequest": "./util-1",
          "loc": "1:0-37"
        }
      ],
      "usedExports": [
        "red"
      ],
      "providedExports": [
        "red",
        "blue",
        "one"
      ],
      "optimizationBailout": [],
      "depth": 2,
      "source": "export { red, blue } from \"./util\";\n\nexport var one = \"one\";"
    },
    {
      "id": 3,
      "identifier": "/Users/rye/scm/fmd/formidable-playbook/node_modules/babel-loader/lib/index.js??ref--0!/Users/rye/scm/fmd/formidable-playbook/examples/frontend/src/es6/util.js",
      "name": "./examples/frontend/src/es6/util.js",
      "index": 3,
      "index2": 0,
      "size": 234,
      "cacheable": true,
      "built": true,
      "optional": false,
      "prefetched": false,
      "chunks": [
        0
      ],
      "assets": [],
      "issuer": "/Users/rye/scm/fmd/formidable-playbook/node_modules/babel-loader/lib/index.js??ref--0!/Users/rye/scm/fmd/formidable-playbook/examples/frontend/src/es6/util-1.js",
      "issuerId": 2,
      "issuerName": "./examples/frontend/src/es6/util-1.js",
      "failed": false,
      "errors": 0,
      "warnings": 0,
      "reasons": [
        {
          "moduleId": 2,
          "moduleIdentifier": "/Users/rye/scm/fmd/formidable-playbook/node_modules/babel-loader/lib/index.js??ref--0!/Users/rye/scm/fmd/formidable-playbook/examples/frontend/src/es6/util-1.js",
          "module": "./examples/frontend/src/es6/util-1.js",
          "moduleName": "./examples/frontend/src/es6/util-1.js",
          "type": "harmony import",
          "userRequest": "./util",
          "loc": "1:0-35"
        }
      ],
      "usedExports": [
        "red"
      ],
      "providedExports": [
        "red",
        "blue"
      ],
      "optimizationBailout": [],
      "depth": 3,
      "source": "export var red = function red(id, msg) {\n  return \"<h1 id=\\\"\" + id + \"\\\" style=\\\"color: red\\\">\" + msg + \"</h1>\";\n};\nexport var blue = function blue(id, msg) {\n  return \"<h1 id=\\\"\" + id + \"\\\" style=\\\"color: blue\\\">\" + msg + \"</h1>\";\n};"
    }
  ],
  "filteredModules": 0,
  "children": []
}