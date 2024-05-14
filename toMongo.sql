--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: webApp; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "webApp" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';


ALTER DATABASE "webApp" OWNER TO postgres;

\connect "webApp"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin_users (
    admin_id integer NOT NULL,
    username character varying(255) NOT NULL,
    password_hash character(60) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    last_login timestamp with time zone
);


ALTER TABLE public.admin_users OWNER TO postgres;

--
-- Name: admin_users_admin_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admin_users_admin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admin_users_admin_id_seq OWNER TO postgres;

--
-- Name: admin_users_admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admin_users_admin_id_seq OWNED BY public.admin_users.admin_id;


--
-- Name: cart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart (
    cart_id integer NOT NULL,
    user_id integer,
    session_id character varying(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.cart OWNER TO postgres;

--
-- Name: cart_cart_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cart_cart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cart_cart_id_seq OWNER TO postgres;

--
-- Name: cart_cart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cart_cart_id_seq OWNED BY public.cart.cart_id;


--
-- Name: cart_item_toppings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart_item_toppings (
    cart_item_id integer NOT NULL,
    topping_id integer NOT NULL
);


ALTER TABLE public.cart_item_toppings OWNER TO postgres;

--
-- Name: cart_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart_items (
    cart_item_id integer NOT NULL,
    cart_id integer NOT NULL,
    meal_id integer NOT NULL,
    quantity integer NOT NULL,
    added_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    comments text
);


ALTER TABLE public.cart_items OWNER TO postgres;

--
-- Name: cart_items_cart_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cart_items_cart_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cart_items_cart_item_id_seq OWNER TO postgres;

--
-- Name: cart_items_cart_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cart_items_cart_item_id_seq OWNED BY public.cart_items.cart_item_id;


--
-- Name: meals; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.meals (
    meal_id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    image_url character varying(255),
    category_id integer,
    tag character varying(100),
    nutrition_info jsonb,
    is_active boolean DEFAULT true
);


ALTER TABLE public.meals OWNER TO postgres;

--
-- Name: meals_meal_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.meals_meal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.meals_meal_id_seq OWNER TO postgres;

--
-- Name: meals_meal_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.meals_meal_id_seq OWNED BY public.meals.meal_id;


--
-- Name: menu_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.menu_categories (
    category_id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text
);


ALTER TABLE public.menu_categories OWNER TO postgres;

--
-- Name: menu_categories_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.menu_categories_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.menu_categories_category_id_seq OWNER TO postgres;

--
-- Name: menu_categories_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.menu_categories_category_id_seq OWNED BY public.menu_categories.category_id;


--
-- Name: order_item_toppings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_item_toppings (
    item_id integer NOT NULL,
    topping_id integer NOT NULL
);


ALTER TABLE public.order_item_toppings OWNER TO postgres;

--
-- Name: order_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_items (
    item_id integer NOT NULL,
    order_id integer NOT NULL,
    meal_id integer NOT NULL,
    quantity integer NOT NULL,
    price numeric(10,2) NOT NULL,
    comments text
);


ALTER TABLE public.order_items OWNER TO postgres;

--
-- Name: order_items_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_items_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_items_item_id_seq OWNER TO postgres;

--
-- Name: order_items_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_items_item_id_seq OWNED BY public.order_items.item_id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    order_id integer NOT NULL,
    order_number character varying(255) NOT NULL,
    total_cost numeric(10,2) NOT NULL,
    tip numeric(10,2) DEFAULT 0.00,
    table_number integer,
    payment_status character varying(50),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_order_id_seq OWNER TO postgres;

--
-- Name: orders_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_order_id_seq OWNED BY public.orders.order_id;


--
-- Name: payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payments (
    payment_id integer NOT NULL,
    order_id integer NOT NULL,
    payment_method character varying(50) NOT NULL,
    payment_details jsonb,
    paid_at timestamp with time zone,
    payment_status character varying(50)
);


ALTER TABLE public.payments OWNER TO postgres;

--
-- Name: payments_payment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payments_payment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payments_payment_id_seq OWNER TO postgres;

--
-- Name: payments_payment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payments_payment_id_seq OWNED BY public.payments.payment_id;


--
-- Name: tables; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tables (
    table_id integer NOT NULL,
    table_number integer NOT NULL,
    qr_code_url character varying(255)
);


ALTER TABLE public.tables OWNER TO postgres;

--
-- Name: tables_table_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tables_table_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tables_table_id_seq OWNER TO postgres;

--
-- Name: tables_table_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tables_table_id_seq OWNED BY public.tables.table_id;


--
-- Name: toppings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.toppings (
    topping_id integer NOT NULL,
    name character varying(100) NOT NULL,
    price numeric(10,2) NOT NULL
);


ALTER TABLE public.toppings OWNER TO postgres;

--
-- Name: toppings_topping_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.toppings_topping_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.toppings_topping_id_seq OWNER TO postgres;

--
-- Name: toppings_topping_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.toppings_topping_id_seq OWNED BY public.toppings.topping_id;


--
-- Name: admin_users admin_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_users ALTER COLUMN admin_id SET DEFAULT nextval('public.admin_users_admin_id_seq'::regclass);


--
-- Name: cart cart_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart ALTER COLUMN cart_id SET DEFAULT nextval('public.cart_cart_id_seq'::regclass);


--
-- Name: cart_items cart_item_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items ALTER COLUMN cart_item_id SET DEFAULT nextval('public.cart_items_cart_item_id_seq'::regclass);


--
-- Name: meals meal_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meals ALTER COLUMN meal_id SET DEFAULT nextval('public.meals_meal_id_seq'::regclass);


--
-- Name: menu_categories category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu_categories ALTER COLUMN category_id SET DEFAULT nextval('public.menu_categories_category_id_seq'::regclass);


--
-- Name: order_items item_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items ALTER COLUMN item_id SET DEFAULT nextval('public.order_items_item_id_seq'::regclass);


--
-- Name: orders order_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN order_id SET DEFAULT nextval('public.orders_order_id_seq'::regclass);


--
-- Name: payments payment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments ALTER COLUMN payment_id SET DEFAULT nextval('public.payments_payment_id_seq'::regclass);


--
-- Name: tables table_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tables ALTER COLUMN table_id SET DEFAULT nextval('public.tables_table_id_seq'::regclass);


--
-- Name: toppings topping_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.toppings ALTER COLUMN topping_id SET DEFAULT nextval('public.toppings_topping_id_seq'::regclass);


--
-- Name: admin_users admin_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_pkey PRIMARY KEY (admin_id);


--
-- Name: admin_users admin_users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_username_key UNIQUE (username);


--
-- Name: cart_item_toppings cart_item_toppings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_item_toppings
    ADD CONSTRAINT cart_item_toppings_pkey PRIMARY KEY (cart_item_id, topping_id);


--
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (cart_item_id);


--
-- Name: cart cart_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (cart_id);


--
-- Name: cart cart_session_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_session_id_key UNIQUE (session_id);


--
-- Name: meals meals_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meals
    ADD CONSTRAINT meals_pkey PRIMARY KEY (meal_id);


--
-- Name: menu_categories menu_categories_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu_categories
    ADD CONSTRAINT menu_categories_name_key UNIQUE (name);


--
-- Name: menu_categories menu_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu_categories
    ADD CONSTRAINT menu_categories_pkey PRIMARY KEY (category_id);


--
-- Name: order_item_toppings order_item_toppings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_item_toppings
    ADD CONSTRAINT order_item_toppings_pkey PRIMARY KEY (item_id, topping_id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (item_id);


--
-- Name: orders orders_order_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_order_number_key UNIQUE (order_number);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (order_id);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (payment_id);


--
-- Name: tables tables_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tables
    ADD CONSTRAINT tables_pkey PRIMARY KEY (table_id);


--
-- Name: tables tables_table_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tables
    ADD CONSTRAINT tables_table_number_key UNIQUE (table_number);


--
-- Name: toppings toppings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.toppings
    ADD CONSTRAINT toppings_pkey PRIMARY KEY (topping_id);


--
-- Name: idx_meals_active; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_meals_active ON public.meals USING btree (is_active);


--
-- Name: idx_order_items_order_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_order_items_order_id ON public.order_items USING btree (order_id);


--
-- Name: idx_orders_payment_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_orders_payment_status ON public.orders USING btree (payment_status);


--
-- Name: cart_item_toppings cart_item_toppings_cart_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_item_toppings
    ADD CONSTRAINT cart_item_toppings_cart_item_id_fkey FOREIGN KEY (cart_item_id) REFERENCES public.cart_items(cart_item_id);


--
-- Name: cart_item_toppings cart_item_toppings_topping_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_item_toppings
    ADD CONSTRAINT cart_item_toppings_topping_id_fkey FOREIGN KEY (topping_id) REFERENCES public.toppings(topping_id);


--
-- Name: cart_items cart_items_cart_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.cart(cart_id);


--
-- Name: cart_items cart_items_meal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_meal_id_fkey FOREIGN KEY (meal_id) REFERENCES public.meals(meal_id);


--
-- Name: meals meals_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meals
    ADD CONSTRAINT meals_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.menu_categories(category_id);


--
-- Name: order_item_toppings order_item_toppings_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_item_toppings
    ADD CONSTRAINT order_item_toppings_item_id_fkey FOREIGN KEY (item_id) REFERENCES public.order_items(item_id);


--
-- Name: order_item_toppings order_item_toppings_topping_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_item_toppings
    ADD CONSTRAINT order_item_toppings_topping_id_fkey FOREIGN KEY (topping_id) REFERENCES public.toppings(topping_id);


--
-- Name: order_items order_items_meal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_meal_id_fkey FOREIGN KEY (meal_id) REFERENCES public.meals(meal_id);


--
-- Name: order_items order_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(order_id);


--
-- Name: payments payments_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(order_id);


--
-- PostgreSQL database dump complete
--

