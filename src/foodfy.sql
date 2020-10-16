PGDMP     
    ,            	    x            foodfy    12.3    12.3 1    G           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            H           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            I           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            J           1262    24636    foodfy    DATABASE     �   CREATE DATABASE foodfy WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Portuguese_Brazil.1252' LC_CTYPE = 'Portuguese_Brazil.1252';
    DROP DATABASE foodfy;
                postgres    false            �            1255    33253    trigger_set_timestamp()    FUNCTION     �   CREATE FUNCTION public.trigger_set_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;
 .   DROP FUNCTION public.trigger_set_timestamp();
       public          postgres    false            �            1259    24661    chefs    TABLE     �   CREATE TABLE public.chefs (
    id integer NOT NULL,
    name text,
    created_at timestamp without time zone,
    file_id integer
);
    DROP TABLE public.chefs;
       public         heap    postgres    false            �            1259    24659    chefs_id_seq    SEQUENCE     �   CREATE SEQUENCE public.chefs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.chefs_id_seq;
       public          postgres    false    205            K           0    0    chefs_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.chefs_id_seq OWNED BY public.chefs.id;
          public          postgres    false    204            �            1259    33221    files    TABLE     ^   CREATE TABLE public.files (
    id integer NOT NULL,
    name text,
    path text NOT NULL
);
    DROP TABLE public.files;
       public         heap    postgres    false            �            1259    33219    files_id_seq    SEQUENCE     �   CREATE SEQUENCE public.files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.files_id_seq;
       public          postgres    false    207            L           0    0    files_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.files_id_seq OWNED BY public.files.id;
          public          postgres    false    206            �            1259    24650    recipes    TABLE       CREATE TABLE public.recipes (
    id integer NOT NULL,
    chef_id integer,
    title text,
    ingredients text[],
    preparation text[],
    information text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    user_id integer
);
    DROP TABLE public.recipes;
       public         heap    postgres    false            �            1259    33232    recipes_files    TABLE     k   CREATE TABLE public.recipes_files (
    id integer NOT NULL,
    recipe_id integer,
    file_id integer
);
 !   DROP TABLE public.recipes_files;
       public         heap    postgres    false            �            1259    33230    recipes_files_id_seq    SEQUENCE     �   CREATE SEQUENCE public.recipes_files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.recipes_files_id_seq;
       public          postgres    false    209            M           0    0    recipes_files_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.recipes_files_id_seq OWNED BY public.recipes_files.id;
          public          postgres    false    208            �            1259    24648    recipes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.recipes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.recipes_id_seq;
       public          postgres    false    203            N           0    0    recipes_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.recipes_id_seq OWNED BY public.recipes.id;
          public          postgres    false    202            �            1259    33378    session    TABLE     �   CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);
    DROP TABLE public.session;
       public         heap    postgres    false            �            1259    33359    users    TABLE     P  CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    reset_token text,
    reset_token_expires text,
    is_admin boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    33357    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    211            O           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    210            �
           2604    24664    chefs id    DEFAULT     d   ALTER TABLE ONLY public.chefs ALTER COLUMN id SET DEFAULT nextval('public.chefs_id_seq'::regclass);
 7   ALTER TABLE public.chefs ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    204    205    205            �
           2604    33224    files id    DEFAULT     d   ALTER TABLE ONLY public.files ALTER COLUMN id SET DEFAULT nextval('public.files_id_seq'::regclass);
 7   ALTER TABLE public.files ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    206    207    207            �
           2604    24653 
   recipes id    DEFAULT     h   ALTER TABLE ONLY public.recipes ALTER COLUMN id SET DEFAULT nextval('public.recipes_id_seq'::regclass);
 9   ALTER TABLE public.recipes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    202    203    203            �
           2604    33235    recipes_files id    DEFAULT     t   ALTER TABLE ONLY public.recipes_files ALTER COLUMN id SET DEFAULT nextval('public.recipes_files_id_seq'::regclass);
 ?   ALTER TABLE public.recipes_files ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    209    208    209            �
           2604    33362    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    211    211            =          0    24661    chefs 
   TABLE DATA           >   COPY public.chefs (id, name, created_at, file_id) FROM stdin;
    public          postgres    false    205   #6       ?          0    33221    files 
   TABLE DATA           /   COPY public.files (id, name, path) FROM stdin;
    public          postgres    false    207   �6       ;          0    24650    recipes 
   TABLE DATA           }   COPY public.recipes (id, chef_id, title, ingredients, preparation, information, created_at, updated_at, user_id) FROM stdin;
    public          postgres    false    203   �7       A          0    33232    recipes_files 
   TABLE DATA           ?   COPY public.recipes_files (id, recipe_id, file_id) FROM stdin;
    public          postgres    false    209   z@       D          0    33378    session 
   TABLE DATA           4   COPY public.session (sid, sess, expire) FROM stdin;
    public          postgres    false    212   �@       C          0    33359    users 
   TABLE DATA           ~   COPY public.users (id, name, email, password, reset_token, reset_token_expires, is_admin, created_at, updated_at) FROM stdin;
    public          postgres    false    211   �@       P           0    0    chefs_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.chefs_id_seq', 25, true);
          public          postgres    false    204            Q           0    0    files_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.files_id_seq', 82, true);
          public          postgres    false    206            R           0    0    recipes_files_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.recipes_files_id_seq', 49, true);
          public          postgres    false    208            S           0    0    recipes_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.recipes_id_seq', 42, true);
          public          postgres    false    202            T           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 13, true);
          public          postgres    false    210            �
           2606    24669    chefs chefs_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.chefs
    ADD CONSTRAINT chefs_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.chefs DROP CONSTRAINT chefs_pkey;
       public            postgres    false    205            �
           2606    33226    files files_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.files DROP CONSTRAINT files_pkey;
       public            postgres    false    207            �
           2606    33237     recipes_files recipes_files_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.recipes_files
    ADD CONSTRAINT recipes_files_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.recipes_files DROP CONSTRAINT recipes_files_pkey;
       public            postgres    false    209            �
           2606    24658    recipes recipes_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.recipes DROP CONSTRAINT recipes_pkey;
       public            postgres    false    203            �
           2606    33385    session session_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);
 >   ALTER TABLE ONLY public.session DROP CONSTRAINT session_pkey;
       public            postgres    false    212            �
           2606    33372    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    211            �
           2606    33370    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    211            �
           2620    33254    recipes set_timestamp    TRIGGER     {   CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.recipes FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
 .   DROP TRIGGER set_timestamp ON public.recipes;
       public          postgres    false    213    203            �
           2606    33248    chefs chefs_file_id_fkey    FK CONSTRAINT     w   ALTER TABLE ONLY public.chefs
    ADD CONSTRAINT chefs_file_id_fkey FOREIGN KEY (file_id) REFERENCES public.files(id);
 B   ALTER TABLE ONLY public.chefs DROP CONSTRAINT chefs_file_id_fkey;
       public          postgres    false    2734    207    205            �
           2606    33391 (   recipes_files recipes_files_file_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.recipes_files
    ADD CONSTRAINT recipes_files_file_id_fkey FOREIGN KEY (file_id) REFERENCES public.files(id) ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.recipes_files DROP CONSTRAINT recipes_files_file_id_fkey;
       public          postgres    false    209    2734    207            �
           2606    33238 *   recipes_files recipes_files_recipe_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.recipes_files
    ADD CONSTRAINT recipes_files_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id);
 T   ALTER TABLE ONLY public.recipes_files DROP CONSTRAINT recipes_files_recipe_id_fkey;
       public          postgres    false    2730    203    209            �
           2606    33386    recipes recipes_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.recipes DROP CONSTRAINT recipes_user_id_fkey;
       public          postgres    false    2740    203    211            =   �   x�u�A
�0����)r��t�(z ���
]�5Hh�@�έ3�n�-??8�oeV`bjh۰5D��`�"���k�$��c�12�{��Ԍ��,˰C�`7�w5�o_�=r��)����-��QRa��g}Na��B��:�      ?   �   x���;r�0��zu3�CȾ�`	1CX�{�x�@ĩ���'�.Q#y��ƪ�1wm�O�mZ�!6U?�k����6;A�՛�QF�"�������uH�G�9��nc4k��c#�=˜K`���Y���;�NK�>e��8t��MXcm�6ɪ^ӭ��4^W!��
��VS|�$g;�%G�d��,9�\�Ǎ�����H��s	^oL�ɨv��[�g���Z��r�g��&�3�
 �7}�P      ;   �  x��X�n��=����K$�R���؛C`�^ā��.6�|�!{�VH6��
�1�X`�E.{,�U79��8� [���U�ޫ���g���⽽���R�������zz�>?��ku�_wǪ0�2�3O3����߹����m	�:�@˿���jp���Z�R{�hY6���篹�Z�c�m��l���M���צ�2�j�_�&+���5�qb��ZBZ^��R���7�V^W�Ъ�O�%�𣳺p�-0q�V�ͱO��K�8�W]����wNU���v�}Ϋ]q��(?���`e�C ��~�Jwý��ǖ�pL����4���8^�2�57F�#<���Z�sa,Po	}+�蛎@����Ȇ����#���#s�q�Z���6}'(}g:�*�����wr�_���39v/)Y�����Ξ��c��h�2sQ`)���a��*R5@��	oor$�*�[G�T�[�	�n+p���O�ײ�s@���|�쮘-?�ux������by�<;9{~�|��ξ���_<�x�X^-^2C<Y{݀�|���佡����E�adR�+~��FL���e�X�����v��2Q���$��9�����Ζ�G:2�M>tih]����8j��#��M=�$�L����F��>�9ߞ-�CI��:�dK��%��)f������h0~c�,��kP(ď�8�#W}���(*[@~�C=&��XY.��|�s��^����=��� 1<�g�恸"w�g��KDh#w�
�h2�k�й��Aɟ���ֳ	c�4m���	�/r��G	���RG���������t4SP�����͘<�Q��F����]���s#��^aƴe��,*�]�nOjX�gbA]�l)�Y;qSo�p鈱��i'�J�0����2�.��IQG�P�T��<_,/�C��\,��F���u&�a�#��Jxp��ֱloR�Ǣ耒��DmR�Hy�W�ŰtzU��v��QC;���M�O�\����%���F@%��`�a,��@�,�ˬ�X�\��ಙ�L%,$+�wX.MSZLS��z�lV�~D����.�uՁ@����?�����EZK�`/h�4̀T�j.eQ��(�z�ciH�^�۩X�=T��q��{�g20<��;�~�>�B�����VR�@|��fD���o��Q��C&ѩ�G�a�gu�4b��*KF�� ի����n�2��&�q��Y��
�Q~��5�ZF|����6��a��G`�lM�wIT�E���i��J�JԸ(�gVzcv�k�rj��L�|�ց���	�G��'�;U��&)@���~\)X.��W.�r#|:)�I>��R�)���)��e��B��]pf"�m�]N��CچSG���戙�Ӡ�Χ������>��e��l��C���G��W̓M�}�n>U=a��ٶ��/�Q�`��,�F���u&�nn|.��3�B#�u`�L�vk*��e�9Pۦew���V7�q���5B�{?ps��2JP��&��$�ش
+?�o�0� @3L���m�=f�l�	�����T?;��//�#*#�G[c�/�f�W�Ab�MC\�t���)��;qSY!�*���a��XY|�m[q�u���Z<Xq�ȏ���ψ��2d%9ҊF�T�/�4��QѠ��f7��?0B��rp@��".U����R���	%+̬�e\���N"�����8�Z��M�Qp�!!��M�Ma�UL�=}��#�u�N�z�%t�-�<��|�I�m����	�VR5��MRzR5�a �ㅑ�%]YW��#)kW�~��k���<F"�w�b�ҫa�]�1��L>`A�Cs+��\Y��d�C�2%P�3��Wf�Gh���L�ng��@ٱxT<�R	[���	�A�k<*���H�"s�r2@��L;�T�V2�~�2�J1�יx����������	/�<�u����XA�Ё�*-4��w��j��䱝(��8�wTh�A#��M������2������{��sS0���q����	i����o޼��g_cnj����X��U�A����Jx��a����fd
!��O�ǁ&\F�3�8�$�w'�,!�:���v��Y-�,�cU��F�����-������S��L�m$&��.d[�ȑA�����^�=�W�,�I�.��#�|�ֹy�h���ɓ'�ɉ5
      A   6   x����0���&�d�B�u�kS!�/դ�2r��x�[|�����      D      x������ � �      C   |   x�34�LL��̃�`R/9?�S�(Q��B�*�4#)<,2�7-�"�-�0��1�ߣ �-���-��D/�?2�$?��'��2���<Ҡ���������@��R��T��������R�������W� ��'#     