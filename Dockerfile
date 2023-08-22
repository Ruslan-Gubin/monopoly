FROM node:lts as dependencies
WORKDIR /monopoly
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

FROM node:lts as builder
WORKDIR /monopoly

COPY . .

COPY tsconfig.json .
COPY --from=dependencies /monopoly/node_modules ./node_modules
RUN npm run build


FROM node:lts as runner
WORKDIR /monopoly
ENV NODE_ENV production

COPY --from=builder /monopoly/public ./public
COPY --from=builder /monopoly/package.json ./package.json
COPY --from=builder /monopoly/.next ./.next
COPY --from=builder /monopoly/node_modules ./node_modules


EXPOSE 3000
CMD ["npm", "start"]
