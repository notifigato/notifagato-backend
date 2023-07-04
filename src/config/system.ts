const { NODE_ENV, PORT } = process.env;

export const isProduction = NODE_ENV === 'production';
export const port = PORT || 3000;
