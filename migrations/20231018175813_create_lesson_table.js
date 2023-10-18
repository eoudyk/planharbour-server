/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("lessons", (table) => {
    table.increments("id").primary(); // Primary key ID
    table.string("grade").notNullable();
    table.string("subject").notNullable();
    table.string("subtopic");
    table.integer("lessonLength").unsigned().notNullable();
    table.integer("studentCount").unsigned();
    table.string("techAvailable").notNullable();
    table.integer("devicesCount");
    table.string("soundAvailable");
    table.string("materialsAvailable");
    table.string("teacherInvolvement");
    table.text("gptResponse").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("lessons");
};
