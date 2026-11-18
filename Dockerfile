FROM docker.arvancloud.ir/library/node:24-alpine

WORKDIR /app

# نصب وابستگی‌ها با استفاده از lock file برای build قابل‌تکرار
COPY package*.json ./
RUN npm ci

# کپی سورس و build
COPY . .
RUN npm run build

# (اختیاری ولی توصیه‌شده) حذف devDependencies برای تصویر نهایی سبک‌تر
# RUN npm prune --omit=dev

EXPOSE 3000

CMD ["npm", "run", "start:prod"]