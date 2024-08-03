const authenticate = (context) => {
  if (!context.request.session.user) {
    return {
      success: false,
      message: "You must be logged in to access this resource",
    };
  }
  context.request.session.touch();
  return context;
};

const authenticationAndErrorHandler = (resolver) => {
  return async (parent, args, context, info) => {
    try {
      const authenticationResult = authenticate(context);
      if (authenticationResult.success === false) {
        return authenticationResult;
      }
      return await resolver(parent, args, context, info);
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };
};

export default authenticationAndErrorHandler;
