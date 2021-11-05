// BinaryExpNode['userData'] = AstNodeUserDataTypes['binaryExp'] & AstNodeUserDataTypes['exp'] & AstNodeUserDataTypes['symbol'] & AstNodeUserDataTypes['ast'];

type AstNodeUserDataTypes={
  ast:{},
  symbol:{},
  token:{},
  'exp':{
    value:number;
  },
  binaryExp:{},
};
