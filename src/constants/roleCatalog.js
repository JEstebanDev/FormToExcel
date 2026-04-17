// Catálogo de tecnologías válidas por rol y categoría.
// Portado desde Extension/src/content/steps/step3Skills.js → ROLE_TECH_CATALOG.
// Categorías: lenguaje, framework, baseDeDatos, aplicacion, plataforma, herramienta, otros

export const CATEGORY_LABELS = {
  lenguaje: "Lenguajes de Programación",
  framework: "Frameworks",
  baseDeDatos: "Bases de Datos",
  aplicacion: "Aplicaciones",
  plataforma: "Plataformas",
  herramienta: "Herramientas",
  otros: "Otros",
};

// Maps the catalog category key → the Excel field key (cell B19-B25)
export const CATEGORY_TO_EXCEL_FIELD = {
  lenguaje: "lenguajes_programacion",
  framework: "frameworks",
  baseDeDatos: "bases_datos",
  aplicacion: "aplicaciones",
  plataforma: "plataformas",
  herramienta: "herramientas",
  otros: "otros",
};

export const CATEGORY_ORDER = [
  "lenguaje",
  "framework",
  "baseDeDatos",
  "aplicacion",
  "plataforma",
  "herramienta",
  "otros",
];

export const MAX_ITEMS_PER_CATEGORY = 4;

export const ROLE_TECH_CATALOG = {
  frontend: {
    lenguaje: ["C# (.NET Framework)", "Fundamentos CSS", "JavaScript", "REACT", "TYPESCRIPT", "Fundamentos HTML"],
    framework: ["Angular", "Next.js (SSR)", "Redux", "Universal (SSR)"],
    otros: ["Caching", "LocalStorage", "DDD", "DOM y Browser Engine", "Event-driven Architecture (EDA)", "Flex", "PWA", "Service Worker"],
    herramienta: ["Jscrambler", "NPM", "WebPack"],
    plataforma: ["DOCKER", "Kubernetes"],
    aplicacion: [],
    baseDeDatos: [],
  },
  backend: {
    lenguaje: ["C# (.NET Framework)", "CL", "COBOL", "Dart", "Elixir", "Java", "Python", "RPG/ILE"],
    framework: ["ASP MVC", "Express", "Flask", "NPA/NHibernate", "Pandas", "Scikit-learn", "Spring Boot", "Spring Cloud", "Spring Web", "Django"],
    otros: ["AMQP", "Apache Camel", "Azure Active Directory", "BDD (Gherkin / Serenity)", "Event-driven Architecture (EDA)", "Jmeter", "JMS", "OAuth 2.0", "OpenAPI", "OpenID", "OWASP", "SOLID", "Sterling"],
    herramienta: ["Analisis Estatico (SonarQube)", "Appium", "Git", "Gradle", "GraphQL", "JUNIT", "NPM", "Postman", "RabbitMQ", "Selenium", "UrbanCode", "WebSocket", "GoAnywhere"],
    plataforma: ["Apache Kafka", "Apache Tomcat", "DOCKER", "IIS", "Kubernetes", "Mockito", "Node.js", "PowerMock", "SPARK", "WAS", "WMQ"],
    aplicacion: ["Artifactory", "SWIFT"],
    baseDeDatos: ["DynamoDB", "DB2", "IBM Cloudant", "MongoDB", "MYSQL", "ORACLE", "PostgreSQL", "REDIS", "SQL Server"],
  },
  fullstack: {
    lenguaje: [],
    framework: ["Angular", "ASP MVC", "Express", "Flask", "Next.js (SSR)", "NPA/NHibernate", "Pandas", "QUARKUS", "Redux", "Scikit-learn", "Spring Boot", "Spring Cloud", "Spring Web", "Spring Framework", "Universal (SSR)", "Django"],
    otros: [],
    herramienta: [],
    plataforma: ["Apache Kafka", "Apache Tomcat", "DOCKER", "IIS", "Kubernetes", "Mockito", "Node.js", "PowerMock", "SPARK", "WAS", "WMQ"],
    aplicacion: ["Artifactory"],
    baseDeDatos: ["DynamoDB", "DB2", "IBM Cloudant", "MongoDB", "MYSQL", "ORACLE", "PostgreSQL", "REDIS", "SQL Server"],
  },
  automatizador: {
    lenguaje: ["Conceptos generales Programacion reactiva", "Java", "Python", "SQL", "XPATH"],
    framework: ["Playwright", "BDD Framework", "Data Driven Framework", "Karate Framework", "Winium"],
    otros: ["Arquitectura de microservicios", "Murex AWS Essentials", "BDD (Gherkin / Serenity)", "DevOps CI", "DevOps CT", "Patron de diseno ScreenPlay", "Pruebas Unitarias", "REST", "SOLID", "WinAppDriver"],
    herramienta: ["Analisis Estatico (SonarQube)", "Appium", "Azure DevOps", "Git", "GraphQL", "Postman", "Selenium", "SoapUI"],
    plataforma: ["AWS RDS", "Kobiton"],
    aplicacion: ["Micro Focus Extra! X-treme (MyExtra)"],
    baseDeDatos: ["DynamoDB", "DB2", "MongoDB", "MYSQL", "ORACLE", "PostgreSQL", "SQL Server"],
  },
  mobile: {
    lenguaje: ["C# (.NET Framework)", "Dart", "Java", "JavaScript", "Kotlin", "Objective C"],
    framework: ["No SQL", "Flutter"],
    otros: ["BDD (Gherkin / Serenity)", "Despliegue en Tiendas", "Device Farm", "Jmeter", "Material Design", "Mobile First Design", "OpenAPI", "Push Notification", "PWA", "Responsive Design", "Service Worker", "Xamarin"],
    herramienta: ["Analisis Estatico (SonarQube)", "Android Studio", "Appium", "ESLint", "Git", "GraphQL", "JSHint", "JUNIT", "Postman", "Prettier", "Selenium", "UrbanCode", "WebSocket"],
    plataforma: ["Mockito", "PowerMock"],
    aplicacion: ["Artifactory", "SWIFT"],
    baseDeDatos: ["Couchbase Mobile", "LevelDB", "SQL Server", "SQLite"],
  },
  devops: {
    lenguaje: ["C# (.NET Framework)", "CL", "COBOL", "Dart", "Elixir", "Python", "RPG/ILE", "Swift (Lenguaje)", "Java"],
    framework: ["ASP MVC", "Express", "Flask", "NPA/NHibernate", "Pandas", "Scikit-learn", "Spring Boot", "Spring Cloud", "Spring Web", "SLIs / SLOs / Blameless Postmortems / Error Budgets / SRE", "Chaos Engineering / Reducing Toil / SRE"],
    otros: ["AMQP", "Apache Camel", "Azure Active Directory", "BDD (Gherkin / Serenity)", "Event-driven Architecture (EDA)", "Jmeter", "JMS", "OAuth 2.0", "OpenAPI", "OpenID", "OWASP", "SOLID", "Sterling"],
    herramienta: ["Analisis Estatico (SonarQube)", "Appium", "Git", "Gradle", "GraphQL", "JUNIT", "NPM", "Postman", "RabbitMQ", "Selenium", "UrbanCode", "WebSocket", "Azure DevOps", "Grafana", "Thanos"],
    plataforma: ["Apache Kafka", "Apache Tomcat", "DOCKER", "IIS", "Kubernetes", "Mockito", "Node.js", "PowerMock", "SPARK", "WAS", "WMQ", "Prometheus"],
    aplicacion: ["Artifactory", "DYNATRACE"],
    baseDeDatos: ["DB2", "IBM Cloudant", "MongoDB", "MYSQL", "ORACLE", "PostgreSQL", "REDIS", "SQL Server", "DynamoDB"],
  },
  arquitectura: {
    lenguaje: ["Java", "C# (.NET Framework)", "RPG/ILE", "CL", "COBOL", "Python", "JavaScript", "REACT", "TYPESCRIPT", "Fundamentos CSS"],
    framework: ["Angular", "Spring Boot", "Spring Cloud", "Spring Web", "NPA/NHibernate", "ASP MVC", "Express", "Flask", "Pandas", "Scikit-learn", "Redux", "Universal (SSR)"],
    otros: ["Certificacion en AWS Solutions Architect - Associate", "Especializacion o Maestria en: Tecnologias de Informacion, Desarrollo y Arquitectura de Software", "DESIGN THINKING", "Patrones de diseno", "DDD", "DevOps", "Analitica", "Blockchain", "OAuth 2.0", "Microservicios", "SOA", "Clean Architecture", "Arquitectura Reactiva - Tacticas Arquitectura", "DISENO ORIENTADO A OBJETOS", "Inteligencia de negocios (Business Intelligence - BI)", "INTEGRACION API", "ARQUITECTURA CLOUD", "ARQUITECTURA DE SOFTWARE"],
    herramienta: [],
    plataforma: ["Node.js", "Apache Kafka"],
    aplicacion: [],
    baseDeDatos: ["SQL Server", "ORACLE", "MYSQL", "DB2", "PostgreSQL", "IBM Cloudant", "REDIS", "MongoDB", "DynamoDB"],
  },
  analista: {
    lenguaje: ["Fundamentos HTML", "Java", "JavaScript", "SQL", "Python"],
    framework: [],
    otros: ["API GATEWAY", "REST", "Acceso Remoto", "Analisis de datos", "API", "Certificados digitales", "Direccionamiento/subneting/vlan/mac", "EXCEL", "Fundamentos basicos financieros", "Lectura de logs", "Metodologias agiles", "Protocolos de comunicacion segura (SSL/TLS/FTP/HTTPS)", "Automatizacion"],
    herramienta: ["POWER AUTOMATE"],
    plataforma: ["Bizagi Process Modeler", "AWS Essentials", "ISERIES", "RPA"],
    aplicacion: ["DataPower", "Power Apps"],
    baseDeDatos: ["SQL Server"],
  },
};
