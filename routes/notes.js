//Import all required resources
const notes = require('express').Router();//Router
const {v4 : uuidv4} = require('uuid');// Generates Unique Id Lib
const path = require('path'); //Path
const fileSystem = require('fs');// File System Lib