"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const js_yaml_1 = __importDefault(require("js-yaml"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const common_1 = require("@nestjs/common");
const logger = new common_1.Logger('Config');
class Config {
    constructor(properties) {
        this.debugLogging = 'debug';
        this['server.port'] = '8081';
        this['jhipster.clientApp.name'] = 'BookAPI';
        this['jhipster.swagger.default-include-pattern'] = '/api/.*';
        this['jhipster.swagger.title'] = 'BookAPI API';
        this['jhipster.swagger.description'] = 'BookAPI API documentation';
        this['jhipster.swagger.version'] = '0.0.1';
        this['jhipster.swagger.path'] = '/api/v2/api-docs';
        this.addAll(properties);
    }
    get(key) {
        return this[key];
    }
    addAll(properties) {
        properties = objectToArray(properties);
        for (const property in properties) {
            if (properties.hasOwnProperty(property)) {
                this[property] = properties[property];
            }
        }
        this.postProcess();
    }
    postProcess() {
        const variables = Object.assign({}, this, process.env);
        for (const property in this) {
            if (this.hasOwnProperty(property)) {
                const value = this[property];
                const processedValue = this.processTemplate(value, variables);
                this[property] = processedValue;
            }
        }
    }
    processTemplate(template, variables) {
        // console.log(template);
        if (typeof template === 'string') {
            return template.replace(new RegExp('\\${[^{]+}', 'g'), name => variables[name.substring(2, name.length - 1)]);
        }
        return template;
    }
}
exports.Config = Config;
const yamlConfigPath = path.join(__dirname, 'config', 'application.yml');
const envYamlConfigPath = path.join(__dirname, 'config', `application-${process.env.NODE_ENV}.yml`);
const yamlConfig = js_yaml_1.default.safeLoad(fs.readFileSync(yamlConfigPath, 'utf8'));
logger.log(`Actual process.env.NODE_ENV value: ${process.env.NODE_ENV}`);
logger.log('Standard allowed values are: dev, test or prod');
if (!fs.existsSync(envYamlConfigPath)) {
    logger.error('does not exist under your config folder an application-{process.env.NODE_ENV}.yml file with your process.env.NODE_ENV value');
}
const envYamlConfig = js_yaml_1.default.safeLoad(fs.readFileSync(envYamlConfigPath, 'utf8'));
const config = new Config(Object.assign({}, objectToArray(yamlConfig), objectToArray(envYamlConfig), { ipAddress: ipAddress() }));
exports.config = config;
function objectToArray(source, currentKey, target) {
    target = target || {};
    for (const property in source) {
        if (source.hasOwnProperty(property)) {
            const newKey = currentKey ? currentKey + '.' + property : property;
            const newVal = source[property];
            if (typeof newVal === 'object') {
                objectToArray(newVal, newKey, target);
            }
            else {
                target[newKey] = newVal;
            }
        }
    }
    return target;
}
function ipAddress() {
    const interfaces = require('os').networkInterfaces();
    for (const dev in interfaces) {
        if (interfaces.hasOwnProperty(dev)) {
            const iface = interfaces[dev];
            for (const alias of iface) {
                if (alias.family === 'IPv4' &&
                    alias.address !== '127.0.0.1' &&
                    !alias.internal) {
                    return alias.address;
                }
            }
        }
    }
    return null;
}
//# sourceMappingURL=config.js.map