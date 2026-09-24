function authorizeRoles(...allowedRoles) {
  const roles = Array.isArray(allowedRoles[0]) ? allowedRoles[0] : allowedRoles;

  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: "Não autenticado." });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Sem permissão." });
    }

    return next();
  };
}

module.exports = { authorizeRoles };