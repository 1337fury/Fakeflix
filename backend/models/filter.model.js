import mongoose from 'mongoose';

const exclusionSchema = new mongoose.Schema({
  name: String,
  ids: [Number]
});

const keywordSchema = new mongoose.Schema({
  name: String,
  words: [String]
});

export const Exclusion = mongoose.model('Exclusion', exclusionSchema);
export const Keyword = mongoose.model('Keyword', keywordSchema);
