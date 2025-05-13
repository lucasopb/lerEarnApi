import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'LerEarn API',
      version: '1.0.0',
      description: 'API para gerenciamento de livros, autores e categorias',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento',
      },
    ],
    components: {
      schemas: {
        Author: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            nationality: { type: 'string' },
            birthDate: { type: 'string', format: 'date' },
            biography: { type: 'string' },
          },
        },
        Category: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            description: { type: 'string' },
          },
        },
        Book: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            title: { type: 'string' },
            description: { type: 'string' },
            publication_year: { type: 'integer' },
            url_download: { type: 'string' },
            author: { $ref: '#/components/schemas/Author' },
            category: { $ref: '#/components/schemas/Category' },
          },
        },
      },
    },
    paths: {
      '/authors': {
        get: {
          summary: 'Lista todos os autores',
          responses: {
            '200': {
              description: 'Lista de autores',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Author' },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: 'Cria um novo autor',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Author' },
              },
            },
          },
          responses: {
            '201': {
              description: 'Autor criado com sucesso',
            },
          },
        },
      },
      '/authors/{id}': {
        get: {
          summary: 'Obtém um autor específico',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          responses: {
            '200': {
              description: 'Autor encontrado',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Author' },
                },
              },
            },
          },
        },
        put: {
          summary: 'Atualiza um autor',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Author' },
              },
            },
          },
          responses: {
            '200': {
              description: 'Autor atualizado com sucesso',
            },
          },
        },
        delete: {
          summary: 'Remove um autor',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          responses: {
            '200': {
              description: 'Autor removido com sucesso',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'Autor deletado com sucesso'
                      }
                    }
                  }
                }
              }
            },
          },
        },
      },
      '/categories': {
        get: {
          summary: 'Lista todas as categorias',
          responses: {
            '200': {
              description: 'Lista de categorias',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Category' },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: 'Cria uma nova categoria',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Category' },
              },
            },
          },
          responses: {
            '201': {
              description: 'Categoria criada com sucesso',
            },
          },
        },
      },
      '/categories/{id}': {
        get: {
          summary: 'Obtém uma categoria específica',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          responses: {
            '200': {
              description: 'Categoria encontrada',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Category' },
                },
              },
            },
          },
        },
        put: {
          summary: 'Atualiza uma categoria',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Category' },
              },
            },
          },
          responses: {
            '200': {
              description: 'Categoria atualizada com sucesso',
            },
          },
        },
        delete: {
          summary: 'Remove uma categoria',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          responses: {
            '200': {
              description: 'Categoria removida com sucesso',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'Categoria deletada com sucesso'
                      }
                    }
                  }
                }
              }
            },
          },
        },
      },
      '/books': {
        get: {
          summary: 'Lista todos os livros',
          responses: {
            '200': {
              description: 'Lista de livros',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Book' },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: 'Cria um novo livro',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Book' },
              },
            },
          },
          responses: {
            '201': {
              description: 'Livro criado com sucesso',
            },
          },
        },
      },
      '/books/{id}': {
        get: {
          summary: 'Obtém um livro específico',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          responses: {
            '200': {
              description: 'Livro encontrado',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Book' },
                },
              },
            },
          },
        },
        put: {
          summary: 'Atualiza um livro',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Book' },
              },
            },
          },
          responses: {
            '200': {
              description: 'Livro atualizado com sucesso',
            },
          },
        },
        delete: {
          summary: 'Remove um livro',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          responses: {
            '200': {
              description: 'Livro removido com sucesso',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'Livro deletado com sucesso'
                      }
                    }
                  }
                }
              }
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options); 