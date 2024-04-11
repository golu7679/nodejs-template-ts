import { capitalizeFirstLetter } from '@common/helper';

export const validate = (schema, property: 'body' | 'query' | 'params') => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    const valid = error === null || error === undefined;
    if (valid) next();
    else {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');
      return res.status(422).send({
        status: 422,
        message: capitalizeFirstLetter(message.replace(/[\\"]/g, '')),
      });
    }
  };
};
