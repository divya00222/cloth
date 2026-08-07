import React, { useState } from 'react';
import { DB_TABLES } from '../data/architectureData';
import { Database, Copy, Check, Table, Key } from 'lucide-react';

export const DatabaseSchemaInspector: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [selectedTable, setSelectedTable] = useState<string>(DB_TABLES[0].name);

  const generateFullSql = () => {
    return `-- ===================================================
-- BALAJI CLOTHING STORE - MYSQL DATABASE SCHEMA
-- Compatible with Hostinger Shared Hosting (MySQL 8.0 / MariaDB 10.5+)
-- Engine: InnoDB | Character Set: utf8mb4_unicode_ci
-- ===================================================

CREATE DATABASE IF NOT EXISTS \`balaji_db\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`balaji_db\`;

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS \`users\` (
  \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`full_name\` VARCHAR(100) NOT NULL,
  \`email\` VARCHAR(150) NOT NULL,
  \`phone\` VARCHAR(20) DEFAULT NULL,
  \`password_hash\` VARCHAR(255) NOT NULL,
  \`role\` ENUM('customer', 'admin') NOT NULL DEFAULT 'customer',
  \`status\` TINYINT(1) NOT NULL DEFAULT 1,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`uk_users_email\` (\`email\`),
  KEY \`idx_users_role\` (\`role\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS \`categories\` (
  \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`parent_id\` INT UNSIGNED DEFAULT NULL,
  \`name\` VARCHAR(100) NOT NULL,
  \`slug\` VARCHAR(120) NOT NULL,
  \`description\` TEXT DEFAULT NULL,
  \`image\` VARCHAR(255) DEFAULT NULL,
  \`is_featured\` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`uk_categories_slug\` (\`slug\`),
  KEY \`idx_categories_parent\` (\`parent_id\`),
  CONSTRAINT \`fk_categories_parent\` FOREIGN KEY (\`parent_id\`) REFERENCES \`categories\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS \`products\` (
  \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`category_id\` INT UNSIGNED NOT NULL,
  \`title\` VARCHAR(200) NOT NULL,
  \`sku\` VARCHAR(50) NOT NULL,
  \`slug\` VARCHAR(220) NOT NULL,
  \`regular_price\` DECIMAL(10,2) NOT NULL,
  \`sale_price\` DECIMAL(10,2) DEFAULT NULL,
  \`stock_quantity\` INT NOT NULL DEFAULT 0,
  \`description\` TEXT NOT NULL,
  \`main_image\` VARCHAR(255) NOT NULL,
  \`is_active\` TINYINT(1) NOT NULL DEFAULT 1,
  \`is_featured\` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`uk_products_sku\` (\`sku\`),
  UNIQUE KEY \`uk_products_slug\` (\`slug\`),
  KEY \`idx_products_cat\` (\`category_id\`),
  KEY \`idx_products_prices\` (\`sale_price\`, \`regular_price\`),
  CONSTRAINT \`fk_products_cat\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. PRODUCT VARIANTS TABLE (Sizes S/M/L/XL/XXL & Colors)
CREATE TABLE IF NOT EXISTS \`product_variants\` (
  \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`product_id\` INT UNSIGNED NOT NULL,
  \`size\` VARCHAR(20) NOT NULL,
  \`color\` VARCHAR(50) NOT NULL,
  \`stock\` INT NOT NULL DEFAULT 0,
  \`price_adjustment\` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (\`id\`),
  KEY \`idx_variants_prod\` (\`product_id\`),
  CONSTRAINT \`fk_variants_prod\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. ORDERS TABLE
CREATE TABLE IF NOT EXISTS \`orders\` (
  \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`order_number\` VARCHAR(50) NOT NULL,
  \`user_id\` INT UNSIGNED DEFAULT NULL,
  \`total_amount\` DECIMAL(10,2) NOT NULL,
  \`payment_status\` ENUM('pending','paid','failed') NOT NULL DEFAULT 'pending',
  \`order_status\` ENUM('processing','shipped','delivered','cancelled') NOT NULL DEFAULT 'processing',
  \`shipping_address\` TEXT NOT NULL,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`uk_orders_num\` (\`order_number\`),
  KEY \`idx_orders_user\` (\`user_id\`),
  KEY \`idx_orders_status\` (\`order_status\`),
  CONSTRAINT \`fk_orders_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateFullSql());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeTableData = DB_TABLES.find(t => t.name === selectedTable) || DB_TABLES[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl text-slate-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Database className="w-5 h-5 text-amber-500" />
            <span>BALAJI MySQL Database Planning</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Normalized relational database structure (InnoDB Engine, utf8mb4_unicode_ci charset)
          </p>
        </div>

        <button
          onClick={copyToClipboard}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs px-4 py-2 rounded-lg flex items-center space-x-2 transition-all shadow-md shadow-amber-500/10"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'SQL Schema Copied!' : 'Copy Complete SQL DDL Script'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Database Tables ({DB_TABLES.length})
          </p>
          {DB_TABLES.map(table => (
            <button
              key={table.name}
              onClick={() => setSelectedTable(table.name)}
              className={`w-full text-left px-3 py-2.5 rounded-lg border text-xs font-mono flex items-center justify-between transition-all ${
                selectedTable === table.name
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 font-bold'
                  : 'bg-slate-800/50 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Table className="w-4 h-4 text-amber-500" />
                <span>{table.name}</span>
              </div>
              <span className="text-[10px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-400 font-sans">
                {table.columns.length} cols
              </span>
            </button>
          ))}
        </div>

        <div className="lg:col-span-3 bg-slate-950 rounded-xl p-4 border border-slate-800 space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-amber-400 font-mono">
                TABLE: {activeTableData.name}
              </h3>
              <span className="text-xs text-slate-400 italic">
                {activeTableData.description}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-800 rounded-lg">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-900 border-b border-slate-800 text-slate-300 uppercase font-sans text-[11px]">
                <tr>
                  <th className="p-2.5">Key</th>
                  <th className="p-2.5">Column Name</th>
                  <th className="p-2.5">Data Type</th>
                  <th className="p-2.5">Nullable</th>
                  <th className="p-2.5">Default</th>
                  <th className="p-2.5 font-sans">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {activeTableData.columns.map((col, i) => (
                  <tr key={i} className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-2.5">
                      {col.key === 'PK' && (
                        <span className="bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded text-[10px] font-bold border border-amber-500/30 flex items-center w-fit space-x-1">
                          <Key className="w-3 h-3 text-amber-400" />
                          <span>PK</span>
                        </span>
                      )}
                      {col.key === 'FK' && (
                        <span className="bg-sky-500/20 text-sky-300 px-1.5 py-0.5 rounded text-[10px] font-bold border border-sky-500/30">
                          FK
                        </span>
                      )}
                      {col.key === 'UK' && (
                        <span className="bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded text-[10px] font-bold border border-emerald-500/30">
                          UK
                        </span>
                      )}
                    </td>
                    <td className="p-2.5 font-bold text-slate-200">{col.name}</td>
                    <td className="p-2.5 text-amber-300/90">{col.type}</td>
                    <td className="p-2.5 text-slate-400">{col.nullable ? 'YES' : 'NO'}</td>
                    <td className="p-2.5 text-slate-400">{col.defaultVal || '-'}</td>
                    <td className="p-2.5 font-sans text-slate-400 text-xs">{col.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 border-t border-slate-800">
            <p className="text-xs font-semibold text-slate-400 mb-1 font-sans">
              Configured Indexes & Constraints:
            </p>
            <div className="flex flex-wrap gap-2">
              {activeTableData.indexes.map((idx, i) => (
                <span key={i} className="bg-slate-900 border border-slate-800 text-slate-300 text-[11px] font-mono px-2.5 py-1 rounded">
                  {idx}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
