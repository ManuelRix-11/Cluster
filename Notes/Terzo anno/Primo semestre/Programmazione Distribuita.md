# Programmazione Distribuita

> **Autore**: Emanuele Ragozzini

---

## Indice Generale

1. [Capitolo 1 — Sistemi Distribuiti e Modelli Architetturali](#capitolo-1--sistemi-distribuiti-e-modelli-architetturali)
   - [1.1 Motivazioni dei Sistemi Distribuiti](#11-motivazioni-dei-sistemi-distribuiti)
   - [1.2 Open Distributed Processing (RM-ODP)](#12-open-distributed-processing-rm-odp)
   - [1.3 Middleware ad Oggetti Distribuiti](#13-middleware-ad-oggetti-distribuiti)
   - [1.4 Modello a Componenti Software](#14-modello-a-componenti-software)
2. [Capitolo 2 — Socket TCP e Comunicazione ad Alto Livello](#capitolo-2--socket-tcp-e-comunicazione-ad-alto-livello)
   - [2.1 Concetto e Ciclo di Vita del Socket TCP](#21-concetto-e-ciclo-di-vita-del-socket-tcp)
   - [2.2 Gerarchia degli Stream I/O in Java](#22-gerarchia-degli-stream-io-in-java)
   - [2.3 Implementazione Client-Server di Esempio (Registro Presenze)](#23-implementazione-client-server-di-esempio-registro-presenze)
3. [Capitolo 3 — Programmazione Concorrente, Processi e Thread](#capitolo-3--programmazione-concorrente-processi-e-thread)
   - [3.1 Processi vs Thread](#31-processi-vs-thread)
   - [3.2 Gestione dei Thread in Java](#32-gestione-dei-thread-in-java)
   - [3.3 Problematiche di Concorrenza: Race Condition e Sezione Critica](#33-problematiche-di-concorrenza-race-condition-e-sezione-critica)
   - [3.4 Meccanismi di Sincronizzazione: Monitor, Lock e Keyword Volatile](#34-meccanismi-di-sincronizzazione-monitor-lock-e-keyword-volatile)
   - [3.5 Proprietà di Vitalità (Liveness): Deadlock, Starvation e Livelock](#35-proprietà-di-vitalità-liveness-deadlock-starvation-e-livelock)
   - [3.6 Blocchi Protetti: Wait, Notify e Pattern Produttore-Consumatore](#36-blocchi-protetti-wait-notify-e-pattern-produttore-consumatore)
   - [3.7 Pattern Singleton nel Multithreading (Double-Checked Locking vs Holder Idiom)](#37-pattern-singleton-nel-multithreading-double-checked-locking-vs-holder-idiom)
4. [Capitolo 4 — Java Remote Method Invocation (RMI)](#capitolo-4--java-remote-method-invocation-rmi)
   - [4.1 Architettura e Modello ad Oggetti Distribuiti RMI](#41-architettura-e-modello-ad-oggetti-distribuiti-rmi)
   - [4.2 Struttura delle Classi e Passaggio dei Parametri](#42-struttura-delle-classi-e-passaggio-dei-parametri)
   - [4.3 Servizio di Naming (RMI Registry)](#43-servizio-di-naming-rmi-registry)
   - [4.4 Sviluppo Guidato di un'Applicazione Distribuita RMI Completa](#44-sviluppo-guidato-di-unapplicazione-distribuita-rmi-completa)
5. [Capitolo 5 — Java EE: Architettura a Componenti Enterprise](#capitolo-5--java-ee-architettura-a-componenti-enterprise)
   - [5.1 Architettura Multi-Tier Enterprise](#51-architettura-multi-tier-enterprise)
   - [5.2 Contexts and Dependency Injection (CDI)](#52-contexts-and-dependency-injection-cdi)
   - [5.3 Java Persistence API (JPA) e Gestione Transazionale](#53-java-persistence-api-jpa-e-gestione-transazionale)
   - [5.4 Enterprise JavaBeans (EJB)](#54-enterprise-javabeans-ejb)
   - [5.5 Java Message Service (JMS) e Messaging Asincrono](#55-java-message-service-jms-e-messaging-asincrono)
   - [5.6 SOAP Web Services con JAX-WS](#56-soap-web-services-con-jax-ws)

---



# Capitolo 1: Sistemi Distribuiti

Un sistema distribuito consiste di un insieme di macchine, ognuna gestita in maniera autonoma, connesse attraverso una rete. Ogni nodo (computer) del sistema distribuito esegue un insieme di componenti che comunicano e coordinano il proprio lavoro attraverso uno strato software detto **middleware**, in maniera che l'utente (del sistema ma anche programmatore e progettista) percepisca il sistema come un'unica entità integrata.

Le caratteristiche principali di un sistema distribuito sono:
* **Remoto:** le componenti sono locali o remote, quindi "distribuite" su macchine diverse.
* **Concorrenza:** un sistema distribuito è per natura concorrente; due o più istruzioni possono essere eseguite contemporaneamente su macchine diverse. Risulta complicata tale esecuzione perché non esistono semafori o lock globali per gestire la sincronizzazione.
* **Assenza di uno stato globale:** non esiste un punto preciso dove controllare lo stato globale dell'intero sistema distribuito, perché essendo i nodi geograficamente distanti non si conosce con certezza lo stato di ogni nodo.
* **Malfunzionamenti parziali:** alcuni componenti distribuiti possono smettere di funzionare, in maniera indipendente dalle altre componenti, e questo fallimento non deve influire sulle funzionalità dell'intero sistema.
* **Eterogeneità:** per definizione un sistema distribuito è eterogeneo, ovvero costituito da componenti diverse sia hardware che software.
* **Autonomia:** un sistema distribuito non può essere controllato da un singolo punto; inoltre la collaborazione dei vari nodi va ottenuta mediando le richieste del sistema distribuito con quelle del sistema che gestisce ciascun nodo.
* **Evoluzione:** un sistema distribuito può cambiare in maniera sostanziale durante la sua vita, sia perché cambia l'ambiente sia perché cambia la tecnologia utilizzata.
* **Mobilità:** adattare al meglio le prestazioni del sistema mobilitando i nodi e le risorse (dati).

---

## 1.1 Motivazioni del perché un sistema distribuito

In generale, i sistemi distribuiti rispondono a motivazioni sia di tipo economico che di natura tecnologica.

### Contesto Economico
Per quanto riguarda il contesto economico, i sistemi distribuiti rispondono alle esigenze del mercato che è caratterizzato da numerose e frequenti acquisizioni, integrazioni e fusioni di aziende. La necessità di affrontare in tempi brevi l'integrazione dei sistemi informatici richiede una infrastruttura versatile e agile. Allo stesso tempo, i sistemi informativi di aziende separate dalla "casa madre" (in meccanismi di downsizing) devono mantenere un certo livello di integrazione, in una sorta di federazione di sistemi per cui si usano i sistemi distribuiti. Infine, l'aumento della platea di utenti di internet richiede di gestire picchi di carico aggiungendo nodi (risorse), perché i sistemi centralizzati non "scalano".

### Contesto Tecnologico
Per il contesto tecnologico, l'hardware subisce evoluzioni velocissime e il software deve reggere il passo, mantenendo però la compatibilità con i sistemi datati (*Legacy*). Diverse "leggi" empiriche prevedono questa velocità di evoluzione:
* **Legge di Moore:** la densità dei transistor nei processori raddoppia ogni 18 mesi (ovvero la potenza di calcolo raddoppia).
* **Legge di Sarnoff:** il valore di una rete di broadcast è direttamente proporzionale al numero di utenti:
  $$V = a \cdot N$$
* **Legge di Metcalfe:** il valore di una rete di comunicazione è direttamente proporzionale al quadrato del numero di utenti:
  $$V = a \cdot N + b \cdot N^2$$
* **Legge di Reed:** il valore di una rete sociale è direttamente proporzionale ad una funzione esponenziale in $N$:
  $$V = a \cdot N + b \cdot N^2 + c \cdot 2^N$$

---

## 1.2 Open Distributed Processing (RM-ODP)

L'**Open Distributed Processing (RM-ODP)** è un modello di riferimento per produttori, sviluppatori e progettisti che serve per facilitare lo sviluppo di sistemi distribuiti, dettagliando le funzionalità ignorando la specifica implementazione hardware e software. Il modello RM-ODP gestisce i problemi di comunicazione rispetto ai problemi (più semplici) di connessione (trattati da ISO/OSI). Punta ad astrarre e standardizzare il concetto di portabilità e trasparenza estendendo ed inglobando il modello ISO/OSI.

### 1.2.1 Requisiti non funzionali di un sistema distribuito
Un **requisito non funzionale** è un aspetto che non è direttamente collegato alle funzionalità, ma indica la qualità del sistema. Sono globali e hanno un impatto significativo sull'architettura. Un sistema distribuito deve essere progettato affinché sia:
* **Aperto:** per supportare la portabilità e l'interoperabilità attraverso interfacce e standard riconosciuti (evitando il legame ad un singolo fornitore).
* **Integrale:** per incorporare sistemi e risorse differenti trattando l'eterogeneità hardware e software.
* **Flessibile:** per integrare sistemi legacy e gestire modifiche a run-time riconfigurandosi dinamicamente.
* **Modulare e con supporto alla federazione:** per unire diversi sistemi sia amministrativamente che architetturalmente.
* **Facilmente gestibile:** per permettere il controllo, la gestione e le politiche di accesso.
* **Con supporto per la Qualità del Servizio (QoS):** fornire servizi con vincoli di tempo, disponibilità e affidabilità, assicurando la tolleranza ai malfunzionamenti.
* **Scalabile:** capace di gestire picchi di carico imprevedibili e la crescita aziendale.
* **Sicuro:** protezione da accessi non autorizzati.
* **Trasparente:** mascherando i dettagli e le differenze dell'architettura sottostante all'utente e al programmatore.

### 1.2.2 Trasparenza di un sistema distribuito
La **trasparenza** nasconde i dettagli operativi; il sistema viene visto come un'unica entità. I vantaggi includono maggiore produttività, velocità di prototipizzazione e alto riuso delle applicazioni. Le trasparenze si dividono in categorie interdipendenti:

1. **Trasparenza di accesso:** nasconde le differenze nella rappresentazione dei dati e nel meccanismo di invocazione. Un oggetto è accessibile attraverso la stessa interfaccia sia in locale che da remoto.
2. **Trasparenza di locazione:** disaccoppia il nome logico di una risorsa dalla sua posizione fisica nella rete (sistema di naming).
3. **Trasparenza di migrazione:** nasconde il fatto che il sistema faccia migrare un oggetto da un nodo ad un altro per ottimizzare le prestazioni o per anticipare guasti. Dipende da accesso e locazione.
4. **Trasparenza di replica:** maschera il fatto che una singola componente viene replicata in più copie per affidabilità e scalabilità.
5. **Trasparenza alla persistenza:** nasconde le operazioni di salvataggio (in memoria secondaria) e riattivazione degli oggetti raramente usati per ottimizzare la memoria principale. Si basa sulla trasparenza di locazione.
6. **Trasparenza alle transazioni (o concorrenza):** nasconde le attività di coordinamento per assicurare la consistenza dello stato degli oggetti, garantendo l'atomicità delle operazioni.
7. **Trasparenza alla scalabilità:** il sistema gestisce carichi crescenti aggiungendo risorse, repliche e migrazioni senza necessità di modifiche all'applicazione.
8. **Trasparenza alle prestazioni:** il sistema implementa bilanciamento del carico, minimizzazione della latenza e ottimizzazione della memoria in modo invisibile all'utente.
9. **Trasparenza ai malfunzionamenti:** nasconde il fallimento parziale di alcune componenti; il sistema reindirizza le richieste sulle repliche o avvia routine di recovery in totale autonomia.

![Figura 1: Gerarchia e dipendenze tra i vari livelli di Trasparenza](images/pd/figura_01.png)

---

## 1.3 Middleware ad oggetti distribuiti

Gli oggetti distribuiti nascono dall'unione dei sistemi distribuiti e della programmazione orientata agli oggetti, allo scopo di realizzare servizi distribuiti riutilizzabili. Questa integrazione avviene tramite il **Middleware ad oggetti distribuiti**, che risiede tra le applicazioni e il sistema operativo/stack di rete. Vi sono tre livelli di middleware:

1. **Middleware di infrastruttura:** fornisce le astrazioni native del SO (memoria, rete, multithreading).
2. **Middleware di distribuzione:** automatizza le operazioni comuni per la comunicazione come il marshalling dei parametri, la gestione del canale, la modifica della semantica (unicast/multicast) e la gestione dei fallimenti di rete.
3. **Middleware per servizi comuni di supporto:** fornisce layer riutilizzabili per la persistenza (database), sicurezza e transazioni.

### 1.3.1 Progenitore: Remote Procedure Calls (RPC)
Negli anni '80, il modello **RPC** permise per la prima volta di invocare procedure su macchine remote come se fossero chiamate locali. Implementò la traduzione dei tipi tramite **Marshalling** per inviare i dati codificati su socket, risolvendo l'eterogeneità della *data representation* (es. Big-Endian vs Little-Endian). Tuttavia, RPC aveva forti limitazioni: era bloccante (sincrono), legato a un paradigma procedurale (non ad oggetti), limitato nei tipi di dato, senza gestione delle eccezioni e con scarsa concorrenza. Le operazioni erano interfacciate tramite **Stub** generati via IDL (*Interface Definition Language*).

![Figura 2: Meccanismo semplificato di una invocazione RPC / RMI](images/pd/figura_02.png)

### 1.3.2 Da RPC al Middleware ad Oggetti Distribuiti
Negli anni '90, il modello si estende agli oggetti distribuiti, integrando polimorfismo, ereditarietà e gestione delle eccezioni. Le storiche implementazioni sono state:
* **CORBA (1991):** standard eterogeneo basato sull'ORB (*Object Request Broker*). Sostituito in seguito a causa di grande complessità e scarsa interoperabilità tra ORB differenti.
* **Java RMI (Remote Method Invocation):** soluzione di casa Sun integrata nativamente in Java. Usa il middleware di distribuzione integrandosi con librerie comuni (divenute poi base di Java EE).
* **Microsoft .NET Framework / DCOM:** l'ambiente Microsoft basato sul CLR (*Common Language Runtime*).

---

## 1.4 Middleware ad oggetti distribuiti nel modello a componenti

L'evoluzione naturale ha portato all'**Enterprise Computing** e ai modelli a **Componenti Distribuite**. Una componente è un blocco binario riutilizzabile eseguito in un **Application Server** (o Container). Qui nasce la distinzione tra:
* **Middleware Esplicito:** lo sviluppatore deve inserire esplicitamente nel codice (tramite API) le chiamate per iniziare transazioni, check di sicurezza, storaggio, ecc.
* **Middleware Implicito:** il container, tramite meccanismi di intercettazione o l'uso di metadati/annotazioni, fornisce autonomamente i servizi in maniera trasparente, garantendo pulizia del codice di business.

---

> [!TIP]
> ### In breve: Sistemi Distribuiti e Middleware
> * **Perché creare un sistema distribuito?** Perché un solo computer non basta più (non scala) e costa troppo aggiornarlo all'infinito. Meglio collegare tanti computer in rete!
> * **L'illusione perfetta (La Trasparenza):** L'obiettivo di un buon sistema è "imbrogliare" l'utente. Quando usi Google o Netflix, non sai su quale server fisico ti trovi, né se quel server si è appena rotto o ha passato la tua sessione a un altro nodo in un continente diverso. Questa "illusione" è la Trasparenza.
> * **Chi fa la magia? Il Middleware!** Il Middleware è un software che fa da ponte. Prende i mattoni grezzi della rete (TCP/IP, hardware eterogeneo) e li trasforma in un canale liscio dove gli oggetti software si chiamano tra loro come se abitassero nello stesso identico PC.
>   * **Ieri:** c'era l'RPC (chiamate rigide a procedure lontane).
>   * **Oggi:** ci sono gli Oggetti Distribuiti (Java RMI) e le logiche a Componenti (Java EE), dove i Container si occupano di fare tutto il lavoro "sporco" in modo nascosto e automatico (Middleware implicito).

---
---

# Capitolo 2: Socket TCP

Nel paradigma di programmazione orientata ad oggetti, la computazione viene effettuata attraverso un insieme di oggetti che contengono uno stato (variabili istanza) ed espongono un comportamento, vale a dire permettono ad altri oggetti di usare i loro metodi. Per poter estendere questo modello di programmazione nell'ambito distribuito, è necessario permettere di invocare un metodo da parte di un oggetto remoto, questo lo si fa mediante i cosiddetti **Socket**.

La comunicazione tra programmi su internet avviene utilizzando la suite di protocolli **TCP/IP**. La maniera in cui questi protocolli vengono usati è quello di fornire un'astrazione (mediante il software di rete) chiamata socket che permette di ricevere e trasmettere dati.

I socket TCP sono degli endpoint di una comunicazione bidirezionale sulla rete che unisce due programmi, ad ogni socket viene assegnato un numero di porta che serve a identificare l'applicazione che è incaricata di dover trattare i dati, che è in esecuzione sul computer che li riceve. Quindi un socket viene univocamente definito dalla combinazione di **indirizzo IP e numero di porta**.

Normalmente, si identificano i due computer coinvolti in un socket, col nome di **client** e **server**:
* Il **server** è in esecuzione ed attende che qualche client richieda la connessione.
* Dal lato **client**, il programma conosce l'indirizzo della macchina su cui è in esecuzione il server ed il numero di porta, in più il client deve anche comunicare al server il numero di porta locale sul quale riceverà i dati (di solito questo viene assegnato dal sistema).

Il procedimento di connessione prevede che il server debba accettare la connessione e che assegni un nuovo socket per la comunicazione bidirezionale tra client e server (socket di comunicazione). In questa maniera, il server può tornare ad accettare connessioni da altri client. In questo caso, tipicamente il server lancia un thread per ogni socket stabilito con un client, in modo da permettere la gestione concorrente delle comunicazioni con tutti i client.

Il package `java.net` offre due classi per i socket, proprio per gestire la fase di accettazione da parte dei server e la comunicazione bidirezionale tra client e server:
1. **La classe `Socket`:** crea il canale di comunicazione;
2. **La classe `ServerSocket`:** accetta connessioni, richiamata dal server. Quest'ultima implementa un socket di connessione che attende richieste da parte del client; quando ne riceve una, assegna un socket alla connessione bidirezionale, restituendo l'oggetto `Socket` che viene usato per la comunicazione tra client e server.

![Figura 3: Ciclo di vita e interazione tra Server Socket e Client Socket](images/pd/figura_03.png)

---

## 2.1 STREAM

La comunicazione tra client e server avviene attraverso la scrittura e la lettura di **stream** (flussi) associati con il socket e che permettono una facile interazione (gestita dal linguaggio) per poter trasmettere istanze di classi Java (oggetti) tra client e server, attraverso un meccanismo di **serializzazione**.

Gli stream di I/O sono una utile astrazione che Java fornisce al programmatore per trattare con una sequenza di dati che può essere "diretta a" / "proveniente da" diverse entità, quali file, periferiche, memoria e ovviamente socket.

Gli stream sono presenti sotto numerose forme: la gerarchia delle classi di stream nel package `java.io` offre un notevole numero di opzioni. La sottoclasse più importante che utilizzeremo è **`ObjectInputStream`**, che fornisce il meccanismo di deserializzazione quando si riceve un oggetto precedentemente serializzato con **`ObjectOutputStream`**. Gli oggetti che possono essere trasmessi su questo tipo di stream devono implementare l'interfaccia **`Serializable`**.

La sequenza di istruzioni classicamente utilizzata per accedere agli stream di un socket lato server è:
```java
ServerSocket serverSocket = new ServerSocket(9000);
socket = serverSocket.accept();
System.out.println("Accettata una connessione... attendo comandi");
ObjectInputStream inStream = new ObjectInputStream(socket.getInputStream());
ObjectOutputStream outStream = new ObjectOutputStream(socket.getOutputStream());
```

### Metodi di `ServerSocket` e `Socket`:
* `ServerSocket(int port)`: crea un server socket su una specifica porta;
* `Socket accept() throws IOException`: aspetta connessioni sul `ServerSocket` e lo accetta (metodo bloccante fino a nuova connessione);
* `public void close() throws IOException`: chiude il socket;
* `void setSoTimeout(int timeout) throws SocketException`: setta un timeout per call ad `accept()`, se il tempo passa viene lanciata l'eccezione.

### Metodi di `InputStream` (dati che da una sorgente esterna possono essere usati dal programma):
* `int available()`: Restituisce una stima del numero di byte che possono essere letti.
* `void close()`: Chiude questo flusso di input.
* `void mark(int readlimit)`: Contrassegna la posizione corrente in questo flusso.
* `boolean markSupported()`: Verifica se questo flusso supporta `mark` e `reset`.
* `abstract int read()`: Legge il byte di dati successivo dal flusso di input.
* `int read(byte[] b)`: Legge un certo numero di byte dal flusso di input.
* `void reset()`: Riposiziona questo flusso nella posizione in cui il metodo `mark` è stato chiamato.
* `long skip(long n)`: Salta e scarta $n$ byte di dati.

### Metodi di `OutputStream` (dati che il programma può inviare):
* `void close()`: Chiude questo flusso di output.
* `void flush()`: Svuota questo flusso di output e forza la scrittura dei byte.
* `void write(byte[] b)`: Scrive byte dalla matrice specificata.
* `abstract void write(int b)`: Scrive il byte specificato.

---

### 2.1.1 Esempio con i Socket

#### `Server.java`
Il client si connette al server su localhost passando `"Giovanni"`. Il server risponde salutando Giovanni con `"Hello Giovanni"`.

Nel `try` instanziamo un socket di connessione sulla porta 9000 e chiamiamo il metodo bloccante `accept()`. Da questo metodo si esce solamente quando un client effettua una richiesta di connessione verso il server, ed il metodo restituisce un socket che è stato stabilito tra il server ed il client. È su questo socket che usiamo gli stream in input e output che servono, prima, per chiamare il metodo (anche esso bloccante) `readObject()` che restituisce l'oggetto trasmesso (e deserializzato dallo stream) che viene utilizzato per realizzare la risposta. Ed infine si chiude il socket con `close()`.

```java
import java.io.*;
import java.net.*;
import java.util.logging.Logger;

public class Server {
    static Logger logger = Logger.getLogger("global");

    public static void main(String[] args) {
        try {
            ServerSocket serverSocket = new ServerSocket(9000);
            logger.info("Socket istanziato, accetto connessioni...");
            Socket socket = serverSocket.accept();
            logger.info("Accettata una connessione... attendo comandi.");

            ObjectOutputStream outStream = new ObjectOutputStream(socket.getOutputStream());
            ObjectInputStream inStream = new ObjectInputStream(socket.getInputStream());

            String nome = (String) inStream.readObject();
            logger.info("Ricevuto: " + nome);

            outStream.writeObject("Hello " + nome);
            socket.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

#### `Client.java`
Il client apre il socket verso l'host locale dove abbiamo lanciato il server (prima riga del `try`), preleva gli stream dal socket e scrive il suo nome sullo stream di output (oggetti `out` e `in`). Il client termina stampando a video quello che ha ricevuto dalla lettura dello stream di input.

> [!NOTE]
> **Particolare attenzione va data all'ordine con il quale si devono aprire gli stream:** prima lo stream di output e poi quello di input.

```java
import java.io.*;
import java.net.*;

public class Client {
    public static void main(String[] args) {
        try {
            Socket socket = new Socket("localhost", 9000);

            ObjectOutputStream out = new ObjectOutputStream(socket.getOutputStream());
            ObjectInputStream in = new ObjectInputStream(socket.getInputStream());

            out.writeObject("Giovanni");
            System.out.println(in.readObject());
            socket.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

Per concludere, il server può essere facilmente reso **iterativo**, inserendo la `accept()` e la risposta verso il client all'interno di un `while(true)`. Poi, si può rendere il server **multithread**, in modo che ad ogni `accept()`, si faccia partire un thread (che gestisce l'invio della risposta ai client) permettendo al server di tornare subito alla `accept()` successiva.

---

### 2.1.2 Esempio Client-Server coi Socket: Registro

#### `RecordRegistro.java`
L'esempio implementa sul server un registro che contiene record (composti da due campi stringa, `nome` e `indirizzo`) che vengono inseriti e possono essere reperiti specificando solamente il nome. Realizzeremo un server che, in attesa su una porta, riceve le richieste di inserimento (codificate attraverso un oggetto `RecordRegistro` con tutti i campi riempiti) o le richieste di ricerca (codificate attraverso un oggetto `RecordRegistro` che ha solo il campo `nome` riempito).

Iniziamo dalla definizione dei record da memorizzare, un semplice wrapper di due campi stringa, con i relativi metodi di accesso. Le istanze sono serializzabili (implementa l'interfaccia `Serializable`), in quanto ci aspettiamo che debbano essere trasmesse su socket TCP in formato binario.

```java
import java.io.Serializable;

public class RecordRegistro implements Serializable {
    private static final long serialVersionUID = 1L;
    private String nome;
    private String indirizzo;

    public RecordRegistro(String n, String i) {
        nome = n;
        indirizzo = i;
    }

    public String getNome() { return nome; }
    public String getIndirizzo() { return indirizzo; }
}
```

#### `RegistroServer.java`
Questo server non fa altro che attendere sulla porta 7000 che ci siano delle richieste di connessione. Il server è iterativo e serve le richieste così come arrivano, quindi senza multithread. Tutti i record che arrivano vanno memorizzati in una `HashMap` che, come chiave di accesso, utilizza il `nome` presente nel record.

Nel ciclo infinito il programma accetta connessioni, riceve un oggetto dallo stream in input. Se l'oggetto ha il campo `indirizzo` non vuoto, allora è una richiesta di inserimento, che viene effettuata nell'`if`, altrimenti si tratta di una ricerca, che viene effettuata e restituita sullo stesso socket, ai client. Se la ricerca è stata infruttuosa, il metodo `get()` restituisce `null` che viene restituito ai client.

```java
import java.io.*;
import java.net.*;
import java.util.HashMap;
import java.util.logging.Logger;

public class RegistroServer {
    private static final Logger logger = Logger.getLogger("RegistroServer");
    private static final int PORT = 7000;

    public static void main(String[] args) {
        HashMap<String, RecordRegistro> archivio = new HashMap<>();

        try (ServerSocket serverSocket = new ServerSocket(PORT)) {
            logger.info("RegistroServer attivo ed in ascolto sulla porta " + PORT);

            while (true) {
                try {
                    Socket socket = serverSocket.accept();
                    logger.info("Nuova connessione accettata da " + socket.getRemoteSocketAddress());

                    ObjectOutputStream out = new ObjectOutputStream(socket.getOutputStream());
                    ObjectInputStream in = new ObjectInputStream(socket.getInputStream());

                    RecordRegistro richiesta = (RecordRegistro) in.readObject();

                    if (richiesta.getIndirizzo() != null) {
                        // Richiesta di inserimento
                        archivio.put(richiesta.getNome(), richiesta);
                        logger.info("Inserito record per: " + richiesta.getNome());
                    } else {
                        // Richiesta di ricerca
                        String nomeDaCercare = richiesta.getNome();
                        RecordRegistro trovato = archivio.get(nomeDaCercare);
                        logger.info("Ricerca per '" + nomeDaCercare + "': " + (trovato != null ? "Trovato" : "Non trovato"));
                        out.writeObject(trovato);
                    }

                    socket.close();
                } catch (Exception ex) {
                    logger.severe("Errore durante la gestione del client: " + ex.getMessage());
                }
            }
        } catch (IOException e) {
            logger.severe("Impossibile avviare il ServerSocket: " + e.getMessage());
        }
    }
}
```

#### `ShellClient.java`
Per ogni richiesta dell'utente, apre il socket, fa la richiesta al server e scrive la risposta (se necessario), chiudendo il socket. Questo avviene sia per l'inserimento che per la ricerca.

Per l'inserimento, dopo aver chiesto all'utente di digitare le stringhe per comporre l'oggetto `RecordRegistro` da inviare, apre il socket, usa lo stream di output, invia l'oggetto e chiude il socket. Per la ricerca, dopo aver chiesto all'utente il nome dei record da ricercare, il client invia un record con il campo indirizzo a `null` e si attende un oggetto in risposta. Se l'oggetto non è `null`, allora la ricerca è andata a buon fine e si stampa l'indirizzo dell'oggetto ricevuto, altrimenti si stampa un messaggio, e si chiude il socket. Il metodo `ask()` serve per fare input da tastiera in maniera semplice, scrivendo un prompt definito nel programma.

```java
import java.io.*;
import java.net.*;

public class ShellClient {
    private static final String HOST = "localhost";
    private static final int PORT = 7000;
    private static final BufferedReader consoleReader = new BufferedReader(new InputStreamReader(System.in));

    private static String ask(String prompt) throws IOException {
        System.out.print(prompt + " > ");
        return consoleReader.readLine();
    }

    public static void main(String[] args) {
        System.out.println("=== CLIENT REGISTRO DISTRIBUITO ===");
        try {
            while (true) {
                System.out.println("\nSeleziona un'operazione:");
                System.out.println("1. Inserisci nuovo record");
                System.out.println("2. Cerca indirizzo per nome");
                System.out.println("3. Esci");
                String scelta = ask("Comando");

                if ("1".equals(scelta)) {
                    String nome = ask("Inserisci Nome");
                    String indirizzo = ask("Inserisci Indirizzo");
                    RecordRegistro nuovoRecord = new RecordRegistro(nome, indirizzo);

                    try (Socket socket = new Socket(HOST, PORT);
                         ObjectOutputStream out = new ObjectOutputStream(socket.getOutputStream())) {
                        out.writeObject(nuovoRecord);
                        System.out.println("Richiesta di inserimento inviata al server.");
                    }

                } else if ("2".equals(scelta)) {
                    String nome = ask("Inserisci il Nome da ricercare");
                    RecordRegistro recordQuery = new RecordRegistro(nome, null);

                    try (Socket socket = new Socket(HOST, PORT);
                         ObjectOutputStream out = new ObjectOutputStream(socket.getOutputStream());
                         ObjectInputStream in = new ObjectInputStream(socket.getInputStream())) {
                        
                        out.writeObject(recordQuery);
                        RecordRegistro risposta = (RecordRegistro) in.readObject();

                        if (risposta != null) {
                            System.out.println("Trovato! Indirizzo: " + risposta.getIndirizzo());
                        } else {
                            System.out.println("Nessun record trovato per il nome specificato.");
                        }
                    }

                } else if ("3".equals(scelta) || "exit".equalsIgnoreCase(scelta)) {
                    System.out.println("Terminazione client.");
                    break;
                } else {
                    System.out.println("Comando non riconosciuto.");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

---

> [!TIP]
> ### In breve: Socket e Stream
> * **Cos'è un Socket?** Immaginalo come una "spina" per connettere due programmi su internet. Ogni connessione ha bisogno di due "socket" (uno per il Client e uno per il Server). Per farli incontrare servono due cose: **Indirizzo IP** (per trovare il computer) e **Porta** (per trovare il programma giusto su quel computer).
> * **Come funziona il colloquio?**
>   1. Il Server sta in attesa (su una porta specifica, usando un `ServerSocket`).
>   2. Il Client decide di connettersi a quella porta.
>   3. Il Server accetta la chiamata (`accept()`) e "sposta" la conversazione su un nuovo socket dedicato, così la porta principale torna libera per ascoltare nuovi client.
> * **Come si scambiano i dati (Stream)?** Una volta stabilito il ponte, i dati viaggiano come un flusso continuo d'acqua (*Stream*).
>   * L'**`OutputStream`** serve per "scrivere" e buttare dati nel tubo.
>   * L'**`InputStream`** serve per "leggere" i dati che arrivano dal tubo.
>   * Se vogliamo inviare interi oggetti Java (invece che semplici stringhe), dobbiamo "impacchettarli" (**Serializzazione**) convertendoli in binario. Per questo si usano `ObjectOutputStream` e `ObjectInputStream`.
>   * **Attenzione all'ordine di apertura!** Prima si apre sempre l'output, poi l'input.

---
---

# Capitolo 3: Programmazione Concorrente, Processi e Thread

Nella programmazione concorrente, ci sono due unità di base di esecuzione: **processi** e **thread**, un sistema informatico ha molti processi e thread attivi. Esistono 3 tipi di programmazione concorrente:

1. **Programmazione concorrente eseguita su calcolatori diversi;**
2. **Processi concorrenti sulla stessa macchina (multitasking);**
3. **Processo padre che genera processi figli per `fork()`.**

Un **processo** ha un ambiente di esecuzione autonomo, ovvero uno spazio di memoria privato di risorse di runtime di base. Un singolo programma, in effetti può essere un insieme finito di processi cooperanti. Per facilitare la comunicazione tra i processi, la maggior parte dei sistemi operativi supporta le risorse **IPC (*Inter Process Communication*)**, come pipe e socket.

I **thread** (anche chiamati *processi leggeri*) esistono all'interno di un processo (ne ha almeno uno, chiamato *main thread*) ed è un'unità di programma che viene eseguita indipendentemente, in più condividono le risorse del processo stesso, inclusa la memoria e file aperti, attraverso **memoria condivisa**, ciò rende la comunicazione efficiente, ma potenzialmente problematica.

Una differenza sostanziale tra thread e processi consiste nel modo con cui essi condividono le risorse:
* Mentre i **processi** sono di solito fra loro indipendenti, utilizzando diverse aree di memoria ed interagendo soltanto mediante appositi meccanismi di comunicazione messi a disposizione dal sistema;
* Al contrario i **thread** di un processo tipicamente condividono le medesime informazioni di stato, la memoria ed altre risorse di sistema.

L'altra differenza è che la creazione di un nuovo processo è sempre onerosa per il sistema, in quanto devono essere allocate risorse necessarie alla sua esecuzione (memoria, periferiche, e così via), il thread invece è parte di un processo e quindi una sua nuova attivazione viene effettuata in tempi ridotti e a costi minimi.

Il **multitasking** è la capacità di un sistema operativo di eseguire più compiti (processi) simultaneamente. Il **multithread** è l'estensione del multitask riferita ad un singolo programma in grado di eseguire più thread "contemporaneamente", principalmente esiste un "Main Thread" che a sua volta è capace di creare altri thread. Alcune applicazioni che usano il multithread sono i browser che devono caricare dal server diverse immagini, visualizzare la pagina e reagire all'eventuale pulsante premuto dall'utente, oppure un'applicazione di rete che chiede dati ad un'altra applicazione, fornisce dati a chi li richiede e tiene informato l'utente dell'andamento delle operazioni.

---

## 3.1 Thread in Java

I thread in Java sono oggetti, istanze quindi di una classe `Thread`, ed hanno un proprio ciclo di vita:

![Figura 4: Ciclo di vita dei Thread Java senza sovrapposizioni di flussi](images/pd/figura_04.png)

### Stati del Ciclo di Vita:
* **New:** Il thread viene creato.
* **Ready:** Il thread è pronto per essere eseguito.
* **Running:** Il thread (le sue istruzioni) è in esecuzione.
* **Timed waiting:** Il thread è in attesa di un dato evento per un tempo prefissato.
* **Waiting:** Il thread entra in un'attesa indefinita.
* **Blocked:** Il thread è in stato blocked quando sta aspettando di acquisire il lock da un monitor.
* **Terminated:** Il thread ha completato la sua esecuzione.

Un thread passa nello stato **Runnable** quando viene chiamato il metodo `start()`. Un thread passa nello stato **Timed Waiting**, **Waiting** o **Blocked** quando vengono chiamate le funzioni scritte sulle frecce (`Thread.sleep()`, `wait()`, `join()`, attesa del monitor lock). Dopo che il thread ha completato l'esecuzione del metodo `run()`, esso viene trasferito nello stato **Terminated**.

### Modalità di gestione dei Thread
Esistono due modalità di gestione dei thread:
1. Istanziare un oggetto thread ogni volta che serve un task asincrono (creazione e gestione a cura del programmatore);
2. Astrarre la gestione, passando un task ad un executor.

Noi ci focalizziamo sulla prima modalità:

#### Modalità 1: Estendere la classe `java.lang.Thread`
1. Estendere la classe `java.lang.Thread`;
2. Riscrivere (ridefinire, override) il metodo `run()` nella sottoclasse di `Thread`;
3. Creare un'istanza di questa classe derivata;
4. Richiamare il metodo `start()` su questa istanza.

> [!NOTE]
> Con questo approccio non è possibile estendere un'altra classe a causa dell'ereditarietà singola di Java.

```java
public class HelloThread extends Thread {
    public void run() {
        System.out.println("Hello from a thread!");
    }
    public static void main(String args[]) {
        (new HelloThread()).start();
    }
}
```

#### Modalità 2: Implementare l'interfaccia `Runnable`
1. Implementare l'interfaccia `Runnable`;
2. Riscrivere il metodo `run()` che viene eseguito ogni volta che si lancia il Thread;
3. L'oggetto istanziato è passato al costruttore di `Thread` e lanciato con `start()`.

Tale approccio è utilizzabile anche per l'approccio con executors.

```java
public class HelloRunnable implements Runnable {
    public void run() {
        System.out.println("Hello from a thread!");
    }
    public static void main(String args[]) {
        (new Thread(new HelloRunnable())).start();
    }
}
```

---

### Metodi utili di `Thread`

#### `Thread.sleep`
`Thread.sleep` fa sì che il thread corrente sospenda l'esecuzione per un periodo specificato. Tuttavia, non è garantito che questi tempi di sospensione siano precisi, perché sono limitati dalle funzionalità fornite dal sistema operativo sottostante. Inoltre, il periodo di sleep può essere interrotto da un interrupt. L'esempio utilizza sleep per stampare i messaggi a intervalli di quattro secondi, in più, il main può lanciare una eccezione che può generare la sleep quando un altro thread interrompe il thread corrente mentre sleep è attivo.

```java
public class SleepMessages {
    public static void main(String args[]) throws InterruptedException {
        String importantInfo[] = { "Mares", "eat", "Little", "kid" };
        for (int i = 0; i < importantInfo.length; i++) {
            Thread.sleep(4000);
            System.out.println(importantInfo[i]);
        }
    }
}
```

#### Meccanismo di Interruzione (`interrupt`)
Un **interrupt** indica ad un thread che dovrebbe fermare quello che sta facendo e fare qualcosa altro. Spetta al programmatore decidere esattamente come un thread risponde a un interrupt, ma è molto comune che il thread termini. Un thread invia un interrupt richiamando `interrupt()` sull'oggetto `Thread`. Affinché il meccanismo di interruzione funzioni correttamente, il thread interrotto deve supportare la propria interruzione. Se il thread richiama frequentemente metodi che generano `InterruptedException`, vengono restituiti dal metodo `run()` dopo aver rilevato l'eccezione. Ad esempio, nella `sleep()` si intercetta l'eccezione e in tal caso si esce, altrimenti si stampa.

```java
for (int i = 0; i < importantInfo.length; i++) {
    // Pause for 4 seconds
    try {
        Thread.sleep(4000);
    } catch (InterruptedException e) {
        // We've been interrupted: no more messages.
        return;
    }
    // Print a message
    System.out.println(importantInfo[i]);
}
```

* **`Thread.interrupted()`:** un thread che non invoca un metodo che lancia l'eccezione `InterruptedException` può controllare se è stato interrotto. Nell'esempio, se è stato ricevuto un interrupt allora si lancia l'eccezione gestita in una unica `catch()` centralizzata.

```java
if (Thread.interrupted()) {
    throw new InterruptedException();
}
```

#### `t.join()`
`t.join()` consente a un thread di attendere il completamento di un altro thread. Se `t` è un oggetto `Thread` il cui thread è attualmente in esecuzione, allora `t.join()` fa sì che il thread corrente sospenda l'esecuzione fino a quando il thread `t` non termina.

```java
//...
t.join();
//...
```

---

### Esempio: `SimpleThreads.java`

`SimpleThreads` consiste di due thread: il primo è il thread principale di ogni applicazione Java che crea un nuovo thread dall'oggetto `Runnable`, `MessageLoop`, e attende che finisca. Se il thread `MessageLoop` impiega troppo tempo per terminare, il thread principale lo interrompe.

Tale programma mostra un messaggio col nome del thread, grazie a `format`, eseguiamo una stampa formattata. Implementiamo un'interfaccia e riscriviamo `run()` che viene eseguito allo start del thread. Al suo interno abbiamo 4 stringhe e poi una `sleep()` interna ad un blocco `try/catch`. Tale blocco stamperà le stringhe con un ritardo di 4 secondi. Se, nel mentre, si verifica un interrupt, e quindi un'eccezione, il `try` la cattura e stamperà `"I wasn't done!"`.

Osservando il `main`, questo può lanciare eccezioni. All'interno viene calcolata la variabile `patience` che conserva il ritardo della stampa. All'interno del `catch` si effettua il controllo del formato. La variabile `startTime` prende il tempo di inizio. Infine, viene creato l'oggetto `Thread` da `MessageLoop` e lo si fa partire richiamando `start()`. Mentre `MessageLoop` è in vita, grazie al `while` che lo controlla con `isAlive()`, aspetta al più 1 secondo, specificato dal metodo `join()`. Se la "pazienza" è scaduta (controllato dall'`if`) e il thread è ancora vivo, allora lo si chiude con `t.interrupt()`, e se ne attende la "fine" tramite `t.join()`, ed infine si esce stampando `"Finally!"`.

```java
public class SimpleThreads {
    static void threadMessage(String message) {
        String threadName = Thread.currentThread().getName();
        System.out.format("%s: %s%n", threadName, message);
    }

    private static class MessageLoop implements Runnable {
        public void run() {
            String importantInfo[] = { "Mares", "eat", "Little", "kid" };
            try {
                for (int i = 0; i < importantInfo.length; i++) {
                    Thread.sleep(4000);
                    threadMessage(importantInfo[i]);
                }
            } catch (InterruptedException e) {
                threadMessage("I wasn't done!");
            }
        }
    }

    public static void main(String args[]) throws InterruptedException {
        long patience = 1000 * 60 * 60;
        if (args.length > 0) {
            try {
                patience = Long.parseLong(args[0]) * 1000;
            } catch (NumberFormatException e) {
                System.err.println("Argument must be an integer.");
                System.exit(1);
            }
        }
        threadMessage("Starting MessageLoop thread");
        long startTime = System.currentTimeMillis();
        Thread t = new Thread(new MessageLoop());
        t.start();
        threadMessage("Waiting for MessageLoop thread to finish");
        while (t.isAlive()) {
            threadMessage("Still waiting...");
            t.join(1000);
            if (((System.currentTimeMillis() - startTime) > patience) && t.isAlive()) {
                threadMessage("Tired of waiting!");
                t.interrupt();
                t.join();
            }
        }
        threadMessage("Finally!");
    }
}
```

---

## 3.2 Problematiche coi Thread

I thread comunicano principalmente condividendo accesso a campi (tipi primitivi) e campi che contengono riferimenti a oggetti. Questa forma di comunicazione è estremamente efficiente, ma rende possibili due tipi di errori:
1. **Interferenza di thread;**
2. **Inconsistenza della memoria.**

### 1. Interferenza di Thread (*Race Condition*)
La prima problematica (l'interferenza) si verifica quando due operazioni, eseguite in thread diversi che agiscono sugli stessi dati, si interfogliano. Avendo questo blocco di codice, se `Counter` fa riferimento a un oggetto da più thread, l'interferenza tra i thread può impedire che ciò accada come previsto:

```java
class Counter {
    private int c = 0;
    public void increment() { c++; }
    public void decrement() { c--; }
    public int value() { return c; }
}
```

Supponiamo che il thread A invoca `increment` circa nello stesso momento in cui il thread B invoca `decrement`:
1. **Thread A:** Recupera $c$.
2. **Thread B:** Recupera $c$.
3. **Thread A:** incremento del valore recuperato; il risultato è $1$.
4. **Thread B:** decrementa del valore recuperato; il risultato è $-1$.
5. **Thread A:** Memorizza il risultato in $c$; $c$ ora è $1$.
6. **Thread B:** Memorizza il risultato in $c$; $c$ è ora $-1$.

Il risultato del thread A viene perso, sovrascritto dal thread B, ma può succedere anche il contrario. Questo scenario porta alla cosiddetta **race condition**, cioè quando il risultato di una operazione dipende dall'ordine di esecuzione di diversi thread.

### 2. Inconsistenza della Memoria
La seconda problematica (l'inconsistenza) avviene quando thread diversi hanno visioni diverse degli stessi dati. Fortunatamente, il programmatore non ha bisogno di una comprensione dettagliata di queste cause, tutto ciò che serve è una strategia per evitarli. Una di queste è la relazione **happens-before**, che è una garanzia che la memoria scritta da un thread è visibile da un altro thread.

Un esempio: il campo `counter` è condiviso tra due thread, A e B. Se le due istruzioni vengono eseguite in thread separati, il valore stampato potrebbe essere `"0"`, perché non c'è garanzia che la modifica del thread A sarà visibile al thread B, e quindi bisogna stabilire una relazione happens-before.

```java
int counter = 0;
//...
counter++;
//...
System.out.println(counter);
```

---

> [!TIP]
> ### In breve: Concorrenza e Thread
> * **Cos'è un Thread?** Pensa a un programma come a una cucina di un ristorante (il Processo). I cuochi che ci lavorano dentro sono i Thread. Condividono tutti lo stesso ambiente (frigorifero, fornelli) e possono cucinare piatti diversi contemporaneamente, rendendo tutto molto più veloce!
> * **Sincronizzazione (Evitare il caos):** Se due cuochi cercano di prendere l'ultimo uovo dal frigo nello stesso istante, fanno un pasticcio (*Race Condition*). Per evitarlo, usano un "lucchetto" (`synchronized`): chi arriva prima prende il lucchetto del frigo, fa quello che deve fare in santa pace, e solo dopo lascia il lucchetto al prossimo cuoco in fila.
> * **I rischi del mestiere:**
>   * **Deadlock:** Il cuoco A ha la padella e aspetta l'olio. Il cuoco B ha l'olio e aspetta la padella. Nessuno dei due cede, e la cucina si blocca per sempre.
>   * **Starvation:** C'è un cuoco "stagista" a cui nessuno dà mai retta. Tutti gli passano davanti per usare i fornelli, e lui non riesce mai a finire il suo piatto.
> * **Come essere efficienti?** Anziché assumere e licenziare un cuoco per ogni singola comanda (che costa tempo e denaro), assumi una squadra fissa di cuochi (*Thread Pool*) che continuano a smaltire le comande una dopo l'altra.

---

## 3.3 Sincronizzazione

La sincronizzazione è lo strumento principale per evitare l'interferenza tra thread e l'inconsistenza della memoria. Tuttavia, essa può introdurre problemi di vitalità (*liveness*). Java fornisce la parola chiave **`synchronized`** che può essere applicata a due livelli:
1. **Metodi sincronizzati (Synchronized Methods);**
2. **Statement sincronizzati (Synchronized Statements).**

### 3.3.1 Metodi Sincronizzati
Per rendere un metodo sincronizzato, è sufficiente aggiungere la parola chiave `synchronized` alla sua dichiarazione. Riprendendo l'esempio del contatore:

```java
public class SynchronizedCounter {
    private int c = 0;

    public synchronized void increment() { c++; }
    public synchronized void decrement() { c--; }
    public synchronized int value() { return c; }
}
```

Se l'oggetto `Counter` viene reso istanza di `SynchronizedCounter`, l'aggiunta di `synchronized` ha due effetti fondamentali:
* **Non è possibile che due invocazioni di metodi sincronizzati sullo stesso oggetto si interfoglino.** Quando un thread sta eseguendo un metodo sincronizzato per un oggetto, tutti gli altri thread che invocano metodi sincronizzati sullo stesso oggetto cambiano stato in `Blocked` e sospendono l'esecuzione finché il primo thread non ha terminato.
* **Quando un metodo sincronizzato esce, stabilisce automaticamente una relazione happens-before con qualsiasi successiva invocazione di un metodo sincronizzato per lo stesso oggetto.** Questo garantisce che i cambiamenti dello stato dell'oggetto siano visibili a tutti i thread.

> [!NOTE]
> I costruttori non possono essere sincronizzati; l'uso della parola chiave `synchronized` con un costruttore è un errore di sintassi, in quanto solo il thread che crea l'oggetto dovrebbe avervi accesso durante la costruzione.

---

### 3.3.2 Lock Intrinseci e Statement Sincronizzati

La sincronizzazione è costruita attorno a un'entità interna nota come **lock intrinseco** o **lock di monitor** (*monitor lock*). I lock intrinseci svolgono un ruolo in entrambi gli aspetti della sincronizzazione: imporre l'accesso esclusivo allo stato di un oggetto e stabilire la relazione happens-before.

Ogni oggetto ha un lock intrinseco associato ad esso. Per convenzione, un thread che ha bisogno di un accesso esclusivo e coerente ai campi di un oggetto deve acquisire il lock intrinseco dell'oggetto prima di accedervi, e poi rilasciare il lock intrinseco quando ha finito. Si dice che un thread possiede il lock intrinseco tra il momento in cui lo ha acquisito e il momento in cui lo rilascia. Finché un thread possiede un lock intrinseco, nessun altro thread può acquisire lo stesso lock; l'altro thread si bloccherà quando tenterà di farlo.

Quando un thread invoca un metodo sincronizzato, acquisisce automaticamente il lock intrinseco per l'oggetto di quel metodo e lo rilascia quando il metodo ritorna, anche se il ritorno è causato da un'eccezione non catturata. Nel caso di un **metodo statico sincronizzato**, il thread acquisisce il lock intrinseco per l'oggetto `Class` associato alla classe, che è separato dal lock per qualsiasi istanza della classe.

#### Statement Sincronizzati
Un altro modo per creare codice sincronizzato è tramite gli statement sincronizzati. A differenza dei metodi sincronizzati, gli statement sincronizzati devono specificare l'oggetto che fornisce il lock intrinseco:

```java
public void addName(String name) {
    synchronized(this) {
        lastName = name;
        nameCount++;
    }
    nameList.add(name);
}
```

In questo esempio, il metodo `addName` deve sincronizzare le modifiche a `lastName` e `nameCount`, ma deve evitare di sincronizzare l'invocazione del metodo `nameList.add`, che potrebbe richiedere molto tempo, migliorando così la concorrenza evitando blocchi lunghi.

Gli statement sincronizzati sono utili anche per migliorare la concorrenza con la **sincronizzazione a grana fine**. Supponiamo, ad esempio, di avere una classe con due campi indipendenti che non vengono mai usati insieme, `c1` e `c2`. Invece di usare metodi sincronizzati (che userebbero il lock dell'intero oggetto impedendo l'aggiornamento simultaneo di `c1` e `c2`), possiamo creare due oggetti separati al solo scopo di fornire i lock:

```java
public class MsLunch {
    private long c1 = 0;
    private long c2 = 0;
    private Object lock1 = new Object();
    private Object lock2 = new Object();

    public void inc1() {
        synchronized(lock1) { c1++; }
    }
    public void inc2() {
        synchronized(lock2) { c2++; }
    }
}
```

---

### 3.3.3 Accesso Atomico

In programmazione, un'**azione atomica** è un'azione che si verifica tutta in una volta o non si verifica affatto. Un'azione atomica non può fermarsi a metà strada: o è completata del tutto, o non è nemmeno iniziata. Non ci sono effetti collaterali visibili finché l'azione non è conclusa.

In Java, le letture e le scritture sono atomiche per le variabili di riferimento (riferimenti a oggetti) e per la maggior parte delle variabili di tipo primitivo (tutti i tipi tranne `long` e `double`). Le letture e le scritture non sono atomiche per i tipi `long` e `double`, a meno che non siano dichiarate con la parola chiave **`volatile`**.

L'uso di variabili `volatile` riduce il rischio di errori di inconsistenza della memoria, poiché qualsiasi scrittura su una variabile `volatile` stabilisce una relazione happens-before con le letture successive della stessa variabile. Ciò significa che le modifiche a una variabile `volatile` sono sempre visibili agli altri thread. Inoltre, impedisce al compilatore e alla JVM di effettuare il **reordering** delle istruzioni, garantendo l'ordine di esecuzione lineare.

---

## 3.4 Vitalità (Liveness)

La capacità di un'applicazione concorrente di essere eseguita in modo tempestivo è definita come **vitalità (*liveness*)**. Questa sezione descrive i tre problemi di vitalità più comuni: **deadlock**, **starvation** e **livelock**.

### 3.4.1 Deadlock (Stallo)
Il **deadlock** descrive una situazione in cui due o più thread sono bloccati per sempre, ciascuno in attesa della risorsa trattenuta dall'altro.

Consideriamo l'esempio classico di Alfonso e Gastone, due amici estremamente educati. Una regola di cortesia prevede che quando un amico si inchina (*bow*), l'altro deve ricambiare l'inchino (*bow back*). Se entrambi si inchinano contemporaneamente, rimarranno bloccati per sempre in attesa che l'altro finisca di ricambiare l'inchino.

![Figura 5: Condizione di stallo circolare (Deadlock) tra due Thread](images/pd/figura_05.png)

```java
public class Deadlock {
    static class Friend {
        private final String name;
        public Friend(String name) { this.name = name; }
        public String getName() { return this.name; }

        public synchronized void bow(Friend bower) {
            System.out.format("%s: %s has bowed to me!%n", this.name, bower.getName());
            bower.bowBack(this);
        }

        public synchronized void bowBack(Friend bower) {
            System.out.format("%s: %s has bowed back to me!%n", this.name, bower.getName());
        }
    }

    public static void main(String[] args) {
        final Friend alfonso = new Friend("Alfonso");
        final Friend gastone = new Friend("Gastone");

        new Thread(new Runnable() {
            public void run() { alfonso.bow(gastone); }
        }).start();

        new Thread(new Runnable() {
            public void run() { gastone.bow(alfonso); }
        }).start();
    }
}
```

Quando questo programma viene eseguito, è estremamente probabile che si blocchi immediatamente. Il Thread 1 acquisisce il lock dell'oggetto `alfonso` ed entra in `bow`, dopodiché tenta di invocare `gastone.bowBack`, richiedendo il lock dell'oggetto `gastone`. Contemporaneamente, il Thread 2 acquisisce il lock dell'oggetto `gastone` ed entra in `bow`, tentando poi di invocare `alfonso.bowBack`. Entrambi i thread rimarranno bloccati nello stato `Blocked` indefinitamente, poiché nessuno dei due rilascerà il lock necessario all'altro.

---

### 3.4.2 Starvation e Livelock

* **Starvation (Inedia):** descrive una situazione in cui un thread non riesce a ottenere un accesso regolare alle risorse condivise ed è incapace di fare progressi. Ciò accade spesso quando le risorse condivise vengono rese non disponibili per lunghi periodi da thread "avidi" che hanno priorità più elevate o che mantengono i lock per troppo tempo.
* **Livelock:** si verifica quando un thread agisce in risposta all'azione di un altro thread, ma l'azione dell'altro thread è a sua volta una risposta all'azione del primo. I thread non sono bloccati (come nel deadlock), ma non possono compiere progressi perché sono costantemente impegnati a rispondere l'uno all'altro cambiando stato continuamente. Un esempio reale è quando due persone si incontrano in un corridoio stretto e tentano di scostarsi contemporaneamente dallo stesso lato, muovendosi da sinistra a destra all'infinito senza riuscire a passarsi.

---

## 3.5 Blocchi Protetti (Guarded Blocks): Wait e Notify

I thread hanno spesso la necessità di coordinare le loro attività. Il modello più comune per fare ciò è il **blocco protetto (*Guarded Block*)**. Tale blocco inizia controllando una condizione che deve essere vera prima che il blocco possa procedere.

Supponiamo che un metodo debba attendere che una variabile booleana condivisa `joy` venga impostata da un altro thread. Un approccio ingenuo ed inefficiente è il **polling** (o *busy waiting*):

```java
public void guardedJoy() {
    // Ciclo vuoto che consuma CPU inutilmente
    while(!joy) {}
    System.out.println("Joy has been achieved!");
}
```

Questo ciclo consuma cicli di CPU in modo continuo. Una soluzione efficiente prevede l'uso del metodo **`wait()`** ereditato da `java.lang.Object`. Quando viene invocato `wait()` all'interno di un contesto sincronizzato, il thread corrente rilascia immediatamente il lock intrinseco e sospende l'esecuzione, entrando nello stato `Waiting`.

```java
public synchronized void guardedJoy() {
    // Il ciclo while è fondamentale per proteggersi dai risvegli spuri
    while(!joy) {
        try {
            wait();
        } catch (InterruptedException e) {}
    }
    System.out.println("Joy and efficiency have been achieved!");
}
```

Per risvegliare un thread in attesa, un altro thread deve acquisire lo stesso lock intrinseco e chiamare il metodo **`notify()`** (che sveglia un singolo thread arbitrario in attesa su quel lock) o **`notifyAll()`** (che risveglia tutti i thread in attesa).

```java
public synchronized void notifyJoy() {
    joy = true;
    notifyAll();
}
```

---

### 3.5.1 Esempio: Modello Produttore-Consumatore con la classe Drop

Il problema del **Produttore-Consumatore** illustra la necessità di sincronizzazione. Un Produttore genera dati e li inserisce in un buffer condivisibile. Un Consumatore preleva i dati dal buffer. Entrambi operano in thread separati. Il produttore deve attendere se il buffer è pieno, mentre il consumatore deve attendere se il buffer è vuoto.

La classe `Drop` funge da canale condivisibile a grana singola (può contenere una sola stringa alla volta):

#### `Drop.java`
```java
public class Drop {
    private String message;
    // True se il consumatore deve attendere il messaggio
    // False se il produttore deve attendere che il consumatore lo legga
    private boolean empty = true;

    public synchronized String take() {
        while (empty) {
            try {
                wait();
            } catch (InterruptedException e) {}
        }
        empty = true;
        notifyAll();
        return message;
    }

    public synchronized void put(String message) {
        while (!empty) {
            try {
                wait();
            } catch (InterruptedException e) {}
        }
        empty = false;
        this.message = message;
        notifyAll();
    }
}
```

Di seguito sono riportati i codici del Produttore e del Consumatore che utilizzano l'oggetto `Drop`:

#### `Producer.java`
```java
import java.util.Random;

public class Producer implements Runnable {
    private Drop drop;

    public Producer(Drop drop) { this.drop = drop; }

    public void run() {
        String importantInfo[] = { "Mares", "eat", "Little", "kid" };
        Random random = new Random();

        for (int i = 0; i < importantInfo.length; i++) {
            drop.put(importantInfo[i]);
            try {
                Thread.sleep(random.nextInt(5000));
            } catch (InterruptedException e) {}
        }
        drop.put("DONE");
    }
}
```

#### `Consumer.java`
```java
import java.util.Random;

public class Consumer implements Runnable {
    private Drop drop;

    public Consumer(Drop drop) { this.drop = drop; }

    public void run() {
        Random random = new Random();
        for (String message = drop.take(); !message.equals("DONE"); message = drop.take()) {
            System.out.format("MESSAGE RECEIVED: %s%n", message);
            try {
                Thread.sleep(random.nextInt(5000));
            } catch (InterruptedException e) {}
        }
    }
}
```

#### `ProducerConsumerExample.java`
L'applicazione principale istanzia l'oggetto condiviso e lancia i due thread:

```java
public class ProducerConsumerExample {
    public static void main(String[] args) {
        Drop drop = new Drop();
        (new Thread(new Producer(drop))).start();
        (new Thread(new Consumer(drop))).start();
    }
}
```

---

## 3.6 Il Pattern Singleton nella Programmazione Multithread

Il pattern Singleton serve a garantire che una classe abbia una sola istanza all'interno dell'applicazione e a fornire un punto di accesso globale ad essa. In un contesto multithread, l'implementazione classica (*Lazy Initialization*) non è sicura e può portare alla creazione di più istanze della classe se due thread accedono simultaneamente al metodo di inizializzazione.

### 3.6.1 Soluzione 1: Metodo Sincronizzato (Inefficiente)
La soluzione più semplice consiste nel rendere l'intero metodo `getInstance()` sincronizzato:

```java
public class ThreadSafeSingleton {
    private static ThreadSafeSingleton instance;
    private ThreadSafeSingleton() {}

    public static synchronized ThreadSafeSingleton getInstance() {
        if (instance == null) {
            instance = new ThreadSafeSingleton();
        }
        return instance;
    }
}
```

> [!NOTE]
> **Problematicità:** Questa soluzione garantisce la sicurezza dei thread, ma introduce un forte collo di bottiglia prestazionale. Il lock viene acquisito ogni volta che viene invocato il metodo `getInstance()`, anche quando l'istanza è già stata creata e le successive letture potrebbero essere eseguite in parallelo senza alcuna sincronizzazione.

---

### 3.6.2 Soluzione 2: Double-Checked Locking (DCL) con Volatile
Per ottimizzare le prestazioni, si riduce la grana della sincronizzazione usando un blocco controllato due volte (*Double-Checked Locking*). Il lock viene acquisito solo se l'istanza è effettivamente nulla. Per far funzionare correttamente questo approccio in Java, il campo `instance` deve obbligatoriamente essere dichiarato come **`volatile`**:

```java
public class DoubleCheckedLockingSingleton {
    private static volatile DoubleCheckedLockingSingleton instance;
    private DoubleCheckedLockingSingleton() {}

    public static DoubleCheckedLockingSingleton getInstance() {
        DoubleCheckedLockingSingleton result = instance;
        if (result == null) {
            synchronized (DoubleCheckedLockingSingleton.class) {
                result = instance;
                if (result == null) {
                    instance = result = new DoubleCheckedLockingSingleton();
                }
            }
        }
        return result;
    }
}
```

> [!IMPORTANT]
> La parola chiave `volatile` è fondamentale: impedisce alla JVM di effettuare il **reordering** delle istruzioni di allocazione della memoria e di esecuzione del costruttore, evitando che un secondo thread possa leggere un riferimento all'oggetto parzialmente inizializzato.

---

### 3.6.3 Soluzione 3: Initialization-on-demand Holder Idiom (Consigliata)
La soluzione ottimale per implementare un Singleton pigro e sicuro senza la necessità di usare esplicitamente costrutti di sincronizzazione complessi si basa sull'uso di una classe interna statica, nota come **Holder**:

```java
public class BillPughSingleton {
    private BillPughSingleton() {}

    private static class SingletonHolder {
        private static final BillPughSingleton INSTANCE = new BillPughSingleton();
    }

    public static BillPughSingleton getInstance() {
        return SingletonHolder.INSTANCE;
    }
}
```

> [!TIP]
> **Meccanismo:** Questa implementazione si affida alle garanzie di inizializzazione della classe fornite dalle specifiche della JVM. La classe interna `SingletonHolder` non viene caricata in memoria quando viene caricata la classe principale `BillPughSingleton`, ma viene caricata ed inizializzata solo ed esclusivamente alla prima chiamata del metodo `getInstance()`. La JVM garantisce che l'inizializzazione delle variabili statiche di classe avvenga in modo sequenziale e intrinsecamente thread-safe, eliminando ogni costo di sincronizzazione a runtime.

---

> [!TIP]
> ### In breve: Sincronizzazione e Vitalità
> * **La chiave di sicurezza (Il Lock Intrinseco):** Ogni singolo oggetto in Java ha un lucchetto invisibile integrato chiamato Lock Intrinseco. Quando un metodo è `synchronized`, il thread che lo chiama blocca l'intero oggetto e si prende la chiave, impedendo a chiunque altro di toccare i metodi protetti di quell'oggetto finché non ha finito.
> * **I tre pericoli della concorrenza (Vitalità):**
>   * **Deadlock:** Stallo totale. Il thread A aspetta il lock detenuto da B, e il thread B aspetta il lock detenuto da A. Nessuno si muove più.
>   * **Starvation:** Un thread sfortunato viene ignorato per sempre dallo scheduler perché ci sono sempre thread con priorità più alta che gli rubano il posto.
>   * **Livelock:** Due thread continuano a cambiare stato per venirsi incontro (come due passanti che ballano per strada provando a evitarsi), ma non fanno alcun progresso effettivo.
> * **Coordinarsi senza sprecare CPU (Wait e Notify):** Se un thread deve aspettare che una condizione si avveri, non deve fare un ciclo infinito vuoto (*busy waiting*) consumando processore. Deve mettersi a dormire con `wait()`. Sarà un altro thread, tramite `notifyAll()`, a svegliarlo non appena i dati saranno pronti (meccanismo essenziale del modello Produttore-Consumatore).
> * **Il Singleton perfetto:** In ambiente concorrente, il Singleton classico rischia di creare doppioni. Sincronizzare l'intero metodo è pesante e rallenta il sistema. Il trucco migliore è l'uso dell'**Holder Class**: una classe interna statica che sfrutta il caricamento sicuro della JVM per creare l'istanza unica solo quando serve davvero, in modo super veloce e senza lucchetti espliciti.

---

> [!TIP]
> ### In breve: Sincronizzazione e Vitalità
> * **La chiave di sicurezza (Il Lock Intrinseco):** Ogni singolo oggetto in Java ha un lucchetto invisibile integrato chiamato *Lock Intrinseco*. Quando un metodo è `synchronized`, il thread che lo chiama blocca l'intero oggetto e si prende la chiave, impedendo a chiunque altro di toccare i metodi protetti di quell'oggetto finché non ha finito.
> * **I tre pericoli della concorrenza (Vitalità):**
>   * **Deadlock:** Stallo totale. Il thread A aspetta il lock detenuto da B, e il thread B aspetta il lock detenuto da A. Nessuno si muove più.
>   * **Starvation:** Un thread sfortunato viene ignorato per sempre dallo scheduler perché ci sono sempre thread con priorità più alta che gli rubano il posto.
>   * **Livelock:** Due thread continuano a cambiare stato per venirsi incontro (come due passanti che ballano per strada provando a evitarsi), ma non fanno alcun progresso effettivo.
> * **Coordinarsi senza sprecare CPU (Wait e Notify):** Se un thread deve aspettare che una condizione si avveri, non deve fare un ciclo infinito vuoto (*busy waiting*) consumando processore. Deve mettersi a dormire con `wait()`. Sarà un altro thread, tramite `notifyAll()`, a svegliarlo non appena i dati saranno pronti (meccanismo essenziale del modello Produttore-Consumatore).
> * **Il Singleton perfetto:** In ambiente concorrente, il Singleton classico rischia di creare doppioni. Sincronizzare l'intero metodo è pesante e rallenta il sistema. Il trucco migliore è l'uso dell'*Holder Class*: una classe interna statica che sfrutta il caricamento sicuro della JVM per creare l'istanza unica solo quando serve davvero, in modo super veloce e senza lucchetti espliciti.

---

# Capitolo 4 — Java Remote Method Invocation (RMI)

**Java Remote Method Invocation (Java RMI)** è una libreria di Java che permette lo sviluppo di applicazioni distribuite, fornendo la possibilità di effettuare comunicazione remota tra programmi scritti in Java. Infatti, Java RMI offre ad un oggetto in esecuzione su una Java Virtual Machine la possibilità di invocare metodi di un oggetto in esecuzione in un'altra JVM, anche se essa si trova su una macchina differente.

Il ruolo che viene ricoperto da Java RMI all'interno della *Java Platform* è quello di **integration library** (libreria per l'integrazione).

Le applicazioni RMI seguono un'architettura client-server dove il server crea un certo numero di oggetti server accessibili da remoto e attende che gli oggetti client ne utilizzino i servizi, compiendo invocazioni remote sui metodi che espongono.

### Obiettivi Principali di Java RMI

Gli obiettivi principali che si poneva la realizzazione di Java RMI sono:

1. **Invocazione trasparente di metodi remoti:** Java RMI offre al programmatore un meccanismo semplice per l'invocazione di metodi che sono offerti da un oggetto remoto, e deve avvenire fornendo l'«illusione» che essa avvenga su un oggetto che risiede all'interno dello stesso spazio di indirizzamento utilizzato dall'oggetto che compie l'invocazione.
2. **Integrazione in Java:** Il modello distribuito si integra all'interno del linguaggio Java standard, che permette di offrire un ambiente familiare allo sviluppatore e può usare gli stessi strumenti, modelli e astrazioni che vengono utilizzati per oggetti locali. Java RMI fornisce un garbage-collector distribuito in modo da preservare la modalità di gestione della memoria di Java che solleva il programmatore dal doversi occupare esplicitamente della memoria.
3. **Non-trasparenza della natura locale/remota di un oggetto:** Nonostante l'obiettivo di assicurare la semplicità di uso per il programmatore, esistono diverse caratteristiche del linguaggio che non devono essere nascoste al programmatore. Quindi, il fatto che un oggetto sia remoto oppure locale deve essere chiaro ed evidente.
4. **Rendere minima la complessità di client e server:** Si deve assicurare la minima complessità all'applicazione distribuita basata su Java RMI. In particolare, il livello di complicazione che viene introdotto da un oggetto distribuito per l'oggetto client (cioè l'oggetto che compie l'invocazione remota) e per l'oggetto server (cioè l'oggetto che riceve ed esegue l'invocazione) deve essere limitato.
5. **Preservare la sicurezza fornita da Java:** Il modello a oggetti distribuito fornito da Java RMI non deve alterare il livello di sicurezza che viene offerto dalla piattaforma Java. Infatti, sin dalla presentazione del linguaggio, la «sicurezza» e la «robustezza» del linguaggio sono state al centro delle attenzioni dei progettisti, principalmente a causa della natura distribuita del linguaggio, che prevede la esecuzione in locale di programmi che vengono scaricati dalla rete.
6. **Modalità di invocazione:** Java RMI deve prevedere la possibilità che esistano diversi tipi di invocazione, fornendo quella di tipo unicast da un client verso un server ma permettendo (in futuro) anche l'estensione verso invocazioni di tipo multicast vale a dire verso diversi server replicati. Inoltre, deve essere possibile che l'oggetto server sia attivato solo al momento dell'invocazione e che i riferimenti ad oggetti persistenti siano persistenti.
7. **Livelli di trasporto multipli:** Infine, Java RMI deve essere aperto verso future espansioni che prevedano che il protocollo di trasporto (basato su socket) possa essere modificato.

---

## Garbage Collection: Locale e Distribuita

Essendo la memoria una risorsa finita, bisogna gestirla al meglio. Esistono, in generale, due filosofie di gestione della memoria:
* La prima è gestita completamente dal programmatore mediante funzioni, come `free()` e `malloc()` in C, e quindi è più facile commettere errori, però il programmatore ha il completo controllo;
* La seconda è fornire un servizio per la allocazione/deallocazione assolutamente trasparente al programmatore, la cosiddetta **garbage collection**, dove tutti gli oggetti vengono automaticamente allocati/deallocati quando il sistema lo ritiene necessario, in quanto esso mantiene traccia dei riferimenti attivi ad ogni oggetto e quindi si ha maggiore produttività in quanto la progettazione e l'implementazione possono ignorare la gestione della memoria.

La **Garbage Collection in locale** funziona mantenendo e calcolando il numero di riferimenti (tramite tecnica *reference counting*) che fanno riferimento ad un oggetto; se un oggetto non è più riferito allora è candidato ad essere eliminato dall'heap alla prossima esecuzione del Garbage Collector.

### Distributed Garbage Collection (DGC) e Meccanismo di Lease

La proposta di Java Remote Method Invocation fornisce un sistema di **Garbage Collection per gli oggetti remoti** (*Distributed Garbage Collection*). Questo meccanismo si basa su una estensione della garbage collection locale: la JVM tiene traccia di tutti i riferimenti all'oggetto remoto che risultano essere attivi (*live*). Alla prima invocazione di un oggetto, la JVM ritiene quell'oggetto referenziato e quindi da non eliminare. Al termine delle invocazioni, il client fa in modo di inviare un messaggio di dereferenziazione dell'oggetto e, la JVM server quindi considera quel riferimento debole (*weak*) e quindi passibile di eliminazione alla prossima invocazione del garbage collector.

Questa tecnica però ha alcuni problemi: ad esempio, il client potrebbe chiudersi per qualche malfunzionamento, oppure potrebbe perdere la connessione verso il server, ed il server si troverebbe con un oggetto remoto che risulta essere referenziato (e quindi da non passare al garbage collector) ma in effetti non sarà mai utilizzato dal client, e quindi rappresenta un potenziale problema di *memory leak*.

A questo scopo si introduce il **meccanismo di lease**, ovvero ogni riferimento che viene assegnato al client ha un tempo di vita specificato. Al termine del periodo, se non vengono effettuate altre invocazioni, il server considera quel riferimento non più valido e quindi l'oggetto diventa *weak* e collezionabile dal garbage collector. Questo significa che, in generale, il programmatore che scrive l'oggetto client deve prevedere che il lease possa scadere e, per evitare che l'oggetto server sia eliminato, fornire dei metodi che (a intervalli di tempo prefissati) provveda a «rinnovare» il lease, effettuando delle chiamate fittizie a metodi che non hanno nessun effetto (*heartbeat / keep-alive*).

---

## Sicurezza in Java: I 4 Livelli della Sandbox

La **sandbox** fornita dal linguaggio permette di eseguire applicazioni (e applet) in maniera tale che le operazioni che esse compiono siano controllate e ristrette così da prevenire danni dovuti ad errori di programmazione oppure da intenzionali tentativi di operazioni illegali.

Java fornisce la sandbox basandosi su **4 livelli di sicurezza**:

1. **Sicurezza del linguaggio:** Java è fortemente tipizzato, quindi tutte le variabili hanno un tipo definito a tempo di compilazione e solamente (poche) implicite conversioni (*casting*) vengono effettuate dal compilatore e dalla macchina virtuale a run-time; tutte le altre operazioni di casting devono essere esplicitate dal programmatore. Poi, Java offre la gestione automatica della memoria attraverso un meccanismo di garbage collection, che impedisce di esaurire lo spazio di indirizzamento del processo. L'assenza di puntatori e l'impossibilità di poter fare aritmetica o assegnamenti con i riferimenti rende impossibile effettuare accessi illegali in memoria. Inoltre, l'accesso alla memoria reale non viene determinato a tempo di compilazione ma a tempo di esecuzione: non si può conoscere in anticipo in che zona di memoria verranno memorizzati gli oggetti e non si può scrivere codice per alterarli. Infine, a tempo di esecuzione vengono controllati i limiti degli array (*array bound checking*) per prevenire accessi a elementi non esistenti.
2. **Classloader:** Si occupa di caricare la classe a tempo di esecuzione, anche da locazioni remote. Il suo compito principale è quello di caricare la classe in un *namespace* separato rispetto a quello delle classi locali, in modo che classi del linguaggio built-in, locali, non possano essere rimpiazzate da altre. Infatti, quando si fa riferimento ad una classe, viene prima cercata tra le classi del sistema locale (*built-in*) e, solo successivamente, nel namespace della classe dalla quale viene riferita.
3. **Bytecode Verifier:** Dopo che il Classloader ha caricato una classe per l'esecuzione, il Bytecode Verifier controlla che essa non sia «volontariamente» ostile, che non ci siano *stack underflow/overflow* e violazioni alle regole specificate dai modificatori di accesso.
4. **Security Manager:** Si occupa di definire i confini della sandbox. Il Security Manager viene interpellato dalla macchina virtuale per ciascuna operazione potenzialmente pericolosa, e fornisce le autorizzazioni sulla base della *policy* che ha stabilito l'utente lanciando la macchina virtuale.

![Figura 6: Ambiente di compilazione ed esecuzione in Java (Sandbox e Sicurezza)](images/pd/figura_06.png)

![Figura 7: Struttura e gerarchia delle classi Java RMI](images/pd/figura_07.png)

---

## 4.1 Modello ad Oggetti Distribuiti di Java RMI

Un **oggetto remoto** è un oggetto i cui metodi possono essere acceduti da un altro spazio di indirizzamento, e potenzialmente da un'altra macchina. 

La descrizione dei servizi offerti da remoto da un oggetto remoto è contenuta all'interno di una **interfaccia remota**, che è un'interfaccia Java che dichiara i metodi remoti.

Una **invocazione di metodi remoti (Remote Method Invocation)** rappresenta l'invocazione di un metodo su un oggetto remoto (specificato nell'interfaccia remota) e ha la stessa sintassi di un'invocazione di un metodo locale.

L'oggetto client di oggetti remoti server utilizza esclusivamente l'interfaccia remota dell'oggetto, non la sua implementazione: questo garantisce che le funzionalità remote risultino astratte verso il client e disaccoppia le due implementazioni, permettendo, ad esempio, evoluzioni dell'oggetto server (cioè della sua implementazione) senza che il client debba essere modificato.

### 4.1.1 Struttura delle Classi Java RMI

Java RMI è contenuto in 5 package fondamentali:
* `java.rmi` e `java.rmi.server`: contengono il meccanismo basilare di funzionamento delle invocazioni remote;
* `java.rmi.activation`: per gli oggetti attivabili;
* `java.rmi.dgc`: per la Distributed Garbage Collection;
* `java.rmi.registry`: per il servizio di localizzazione (Naming).

#### Interfacce ed Eccezioni Remote

Prima di definire un oggetto remoto, si deve definire un'interfaccia remota per l'oggetto, in modo che vengano esposti i servizi che l'oggetto remoto intende mettere a disposizione per un utilizzo da parte dei client. 

Un'interfaccia remota per Java RMI deve estendere l'interfaccia `java.rmi.Remote`, che è un'interfaccia cosiddetta *marker*, cioè un'interfaccia vuota che serve solamente per poter segnalare che essa definisce dei metodi accessibili da remoto. 

Ogni metodo descritto in un'interfaccia remota deve essere un metodo remoto, cioè deve soddisfare entrambe le seguenti condizioni:
1. **Dichiarazione esplicita dell'eccezione `RemoteException`:** Un metodo remoto deve dichiarare esplicitamente l'eccezione `java.rmi.RemoteException`, poiché la semantica dei malfunzionamenti di un oggetto remoto è diversa da quella dei malfunzionamenti di un oggetto locale. In questa maniera si forza lo sviluppo successivo, che comporterà l'invocazione di questi metodi, a gestire l'eccezione remota in maniera esplicita, in quanto il compilatore controlla che l'eccezione sia gestita (*checked exception*).
2. **Parametri e valori di ritorno tramite Interfaccia Remota:** I parametri remoti di un metodo remoto devono essere dichiarati tramite la propria interfaccia remota, non utilizzando la classe dell'implementazione remota. Questo permetterà di poter passare riferimenti remoti sia come parametri che come valori restituiti.

Il meccanismo dell'interfaccia remota aggiunge un livello ulteriore di accessibilità ai modificatori di accesso dei metodi (`public`, `protected`, etc.). I metodi remoti dichiarati in un'interfaccia remota sono più accessibili dei metodi `public`, che risultano accessibili ma solamente da invocazioni all'interno della stessa macchina virtuale. Infine, nelle interfacce (anche remote) è possibile definire delle costanti.

#### Implementazioni Remote

Per realizzare l'implementazione remota che deriva (`implements`) da un'interfaccia remota per offrire verso l'esterno i metodi remoti in essa definiti, si può procedere in due modi:

1. **Riuso dell'implementazione remota:** prevede che la classe che contiene l'implementazione dell'oggetto derivi esplicitamente da `java.rmi.server.UnicastRemoteObject`, ereditando di conseguenza il comportamento definito dalle classi `java.rmi.server.RemoteObject` e `java.rmi.server.RemoteServer`.
2. **Classe di implementazione locale:** permette che la classe derivi il comportamento da qualche altra classe (non remota) e che si debba quindi occupare esplicitamente di esportare l'oggetto (tramite il metodo statico `exportObject()` di `java.rmi.server.UnicastRemoteObject`) e di implementare la semantica di alcune operazioni di `Object` per oggetti remoti che sono ridefinite in `java.rmi.server.RemoteObject` e `java.rmi.server.RemoteServer` (quali `equals`, `hashCode` e `toString`).

#### Architettura a Livelli e Meccanismo di Invocazione

L'applicazione dell'utente si trova in cima a questi livelli e interagisce (in maniera moderata) con i tre livelli sottostanti:
* **Stub/Skeleton Layer:** che comprende gli stub lato client e gli skeleton lato server;
* **Remote Reference Layer (RRL):** che specifica il comportamento dell'invocazione e la semantica del riferimento (unicast, multicast, etc.);
* **Transport Layer:** che si occupa della connessione di rete e della sua gestione.

![Figura 8: Invocazione remota tramite livelli Stub/Skeleton e Socket](images/pd/figura_08.png)

> [!TIP]
> ### In breve: Java RMI
> * **Cos'è Java RMI?** È la magia che permette a un programma Java in esecuzione sul tuo PC di chiamare un metodo di un oggetto che vive su un altro PC dall'altra parte del mondo, come se fosse lì accanto a lui.
> * **Come si mantiene pulito l'ambiente?** Tramite il Garbage Collector distribuito. RMI tiene traccia di chi usa cosa. Se un oggetto remoto non è più usato da nessun client, viene eliminato. E se un client "sparisce" improvvisamente senza avvisare? RMI usa il *Lease* (una sorta di "affitto a tempo"): se il client non rinnova l'affitto inviando un segnale di vita, il server butta l'oggetto nella spazzatura per evitare colli di bottiglia (*Memory Leak*).
> * **La struttura a strati:** Non comunichiamo direttamente con la rete, ma passiamo per dei delegati:
>   * **Lo Stub:** È il rappresentante dell'oggetto remoto che sta sul client. Il client parla con lui, e lui "impacchetta" (*Marshalling*) la richiesta.
>   * **Lo Skeleton:** Sta sul server. Prende il pacchetto arrivato dallo Stub, lo "spacchetta" (*Unmarshalling*) e lo passa al vero oggetto Java.
>   * Sotto di loro c'è il **Remote Reference Layer** (che capisce se la chiamata è per uno o più server) e infine il **Transport Layer** (che gestisce i cavi veri e propri tramite Socket TCP).

---

### 4.1.2 Servizio di Naming (RMI Registry)

Affinché un client possa invocare un metodo su un oggetto remoto, deve innanzitutto ottenere un riferimento a tale oggetto. Java RMI fornisce un **servizio di Naming (chiamato RMI Registry)** che permette ai server di registrare i propri oggetti remoti associandoli a un nome logico (una stringa), e ai client di cercare e ottenere il riferimento all'oggetto tramite questo nome.

Il registry è un processo separato (un demone) che in genere viene eseguito sulla stessa macchina del server, ascoltando di default sulla porta **1099**. L'interazione con il registry avviene tramite la classe `java.rmi.Naming` (o l'interfaccia `java.rmi.registry.Registry`), che espone metodi statici fondamentali:

| Metodo di `java.rmi.Naming` | Ruolo e Descrizione | Attore Principale |
| :--- | :--- | :--- |
| **`bind(String name, Remote obj)`** | Associa il nome logico all'oggetto remoto. Lancia un'eccezione (`AlreadyBoundException`) se il nome è già in uso. | Server |
| **`rebind(String name, Remote obj)`** | Associa (o sovrascrive) il nome all'oggetto remoto. È il metodo più comunemente usato dai server. | Server |
| **`unbind(String name)`** | Rimuove l'associazione esistente per il nome logico specificato. | Server |
| **`lookup(String name)`** | Utilizzato dal client per cercare l'oggetto remoto. Restituisce un riferimento di tipo `Remote` che il client dovrà poi sottoporre a cast (*downcasting*) verso l'interfaccia remota specifica. | Client |

---

## 4.2 Sviluppo di un'Applicazione Java RMI

Lo sviluppo di un'applicazione distribuita in Java RMI richiede una serie di passi sequenziali ben definiti sia per il lato server che per il lato client.

### 4.2.1 1. Definizione dell'Interfaccia Remota (`Hello.java`)

Il primo passo consiste nel definire l'interfaccia che espone i metodi invocabili remotamente. Tale interfaccia deve estendere `java.rmi.Remote` e tutti i suoi metodi devono dichiarare di poter lanciare una `RemoteException`.

```java
import java.rmi.Remote;
import java.rmi.RemoteException;

public interface Hello extends Remote {
    public String sayHello(String name) throws RemoteException;
}
```

### 4.2.2 2. Implementazione dell'Oggetto Remoto (`HelloImpl.java`)

L'oggetto server deve implementare l'interfaccia remota appena creata. Nel modello classico, la classe estende `UnicastRemoteObject`, il che significa che l'oggetto verrà esportato automaticamente sul runtime RMI non appena viene istanziato. È necessario definire un costruttore esplicito che propaghi la `RemoteException`.

```java
import java.rmi.server.UnicastRemoteObject;
import java.rmi.RemoteException;

public class HelloImpl extends UnicastRemoteObject implements Hello {

    // Il costruttore deve dichiarare RemoteException perché
    // UnicastRemoteObject la lancia durante l'esportazione
    public HelloImpl() throws RemoteException {
        super();
    }

    @Override
    public String sayHello(String name) throws RemoteException {
        System.out.println("Invocazione ricevuta da: " + name);
        return "Ciao " + name + ", benvenuto nel server RMI!";
    }
}
```

### 4.2.3 3. Sviluppo del Server RMI (`HelloServer.java`)

Il programma Server deve farsi carico di istanziare l'oggetto remoto e di registrarlo nel RMI Registry in modo che i client possano trovarlo.

```java
import java.rmi.Naming;

public class HelloServer {
    public static void main(String[] args) {
        try {
            // 1. Istanzia l'oggetto remoto
            HelloImpl obj = new HelloImpl();

            // 2. Registra l'oggetto nel Registry con un nome logico
            Naming.rebind("rmi://localhost/HelloService", obj);

            System.out.println("HelloServer pronto e in ascolto...");
        } catch (Exception e) {
            System.err.println("Eccezione nel Server: " + e.toString());
            e.printStackTrace();
        }
    }
}
```

### 4.2.4 4. Sviluppo del Client RMI (`HelloClient.java`)

Il Client utilizza la classe `Naming` per effettuare il lookup dell'oggetto remoto, ottiene il riferimento (lo stub) ed effettua l'invocazione del metodo come se fosse un oggetto puramente locale.

```java
import java.rmi.Naming;

public class HelloClient {
    public static void main(String[] args) {
        try {
            // 1. Ottiene il riferimento tramite il Registry
            Hello stub = (Hello) Naming.lookup("rmi://localhost/HelloService");

            // 2. Invoca il metodo remoto
            String response = stub.sayHello("Giovanni");

            System.out.println("Risposta dal server: " + response);
        } catch (Exception e) {
            System.err.println("Eccezione nel Client: " + e.toString());
            e.printStackTrace();
        }
    }
}
```

### 4.2.5 5. Compilazione ed Esecuzione

L'esecuzione di un'applicazione RMI prevede la gestione corretta dei processi sulla macchina:

1. **Compilazione:** si compilano normalmente tutte le classi:
   ```bash
   javac *.java
   ```
   > [!NOTE]
   > Nelle versioni antecedenti a Java 5, era necessario usare il tool `rmic` per generare esplicitamente le classi Stub e Skeleton (`rmic HelloImpl`). Oggi, gli stub vengono generati dinamicamente a runtime.

2. **Avvio del Registry:** prima di avviare il server, è imperativo lanciare il servizio di naming da riga di comando tramite il comando `rmiregistry`:
   * Su Windows:
     ```cmd
     start rmiregistry
     ```
   * Su Linux / macOS:
     ```bash
     rmiregistry &
     ```
3. **Avvio del Server:** esecuzione del server:
   ```bash
   java HelloServer
   ```
4. **Avvio del Client:** esecuzione del client su un'altra console/terminale:
   ```bash
   java HelloClient
   ```

---

> [!TIP]
> ### In breve: Sviluppare in RMI
> * **Il Registro RMI (L'elenco telefonico):** Come fa il client a trovare il server su Internet? Il Server, appena nasce, "pubblica" il suo nome su una bacheca pubblica chiamata *RMI Registry*. Il Client consulta questa bacheca (tramite `Naming.lookup`), trova il nome e riceve indietro il riferimento per poter comunicare.
> * **I 4 Passi per creare un'app distribuita:**
>   1. **L'Interfaccia:** Creare un'interfaccia Java che estende `Remote`. Tutti i metodi qui dentro devono dichiarare che potrebbero fallire (`throws RemoteException`) perché la rete può bloccarsi.
>   2. **L'Implementazione:** Scrivere il vero codice del server. Se estendiamo `UnicastRemoteObject`, l'oggetto si autoconfigura per ricevere chiamate di rete.
>   3. **Il Server:** Un programmino main che crea l'oggetto e lo appiccica nella bacheca (`Naming.rebind`).
>   4. **Il Client:** Un main che legge la bacheca, scarica il "rappresentante" dell'oggetto (lo Stub) e gli invoca il metodo passandogli i parametri.
> * **Avvio:** Prima si accende la bacheca (`rmiregistry`), poi il Server, e infine si lancia il Client!

---
---

# Capitolo 5 — Java EE Guide: Architettura a Componenti

**Java Platform, Enterprise Edition (Java EE)** rappresenta lo standard industriale per lo sviluppo di applicazioni enterprise scalabili, robuste e sicure. A differenza di Java SE, l'ambiente Java EE è basato su un'architettura a componenti distribuiti che vengono eseguiti all'interno di un **Container**.

Un **componente** è un'unità software indipendente e riutilizzabile, che racchiude logica di business e offre servizi ad altri componenti o client. 

Il **Container** è l'ambiente di runtime che gestisce il ciclo di vita dei componenti e fornisce loro i servizi infrastrutturali di base (*middleware implicito*), come la gestione delle transazioni, la sicurezza, il multithreading e l'accesso al database.

### I Principali Container in Java EE

I principali container in Java EE sono:
* **Web Container:** ospita i componenti web (Servlet, JSP, JSF) e gestisce le richieste HTTP.
* **EJB Container:** ospita i componenti di business (Enterprise JavaBeans) e fornisce servizi avanzati come transazioni distribuite e invocazioni asincrone.
* **Application Client Container:** gestisce le applicazioni client stand-alone.

![Figura 9: Architettura a livelli di Java EE e interazione tra Container](images/pd/figura_09.png)

---

## 5.1 Contexts and Dependency Injection (CDI)

La **Dependency Injection (Iniezione delle Dipendenze)** è un design pattern che permette di rimuovere le dipendenze hard-coded tra le classi. In Java EE, il servizio **CDI (Contexts and Dependency Injection)** permette al container di farsi carico della creazione e dell'iniezione dei componenti dove sono necessari, sollevando il programmatore dall'uso dell'operatore `new`.

L'annotazione fondamentale è **`@Inject`**. Quando il container incontra questa annotazione su un campo, un costruttore o un metodo setter, si occupa di cercare nel suo contesto un bean compatibile e lo istanzia, iniettandolo nel componente.

```java
import javax.inject.Inject;

public class OrdineService {

    @Inject
    private PagamentoService pagamentoService;

    public void processaOrdine() {
        // pagamentoService è già istanziato e pronto all'uso!
        pagamentoService.paga();
    }
}
```

### I Contesti e gli Scopes di CDI

I **Contexts (Contesti)** definiscono il ciclo di vita e la visibilità di un bean iniettato. Le principali annotazioni di scope sono:

| Annotazione Scope | Ciclo di Vita / Durata | Ambito di Utilizzo Tipico |
| :--- | :--- | :--- |
| **`@RequestScoped`** | Il bean viene creato all'inizio di una richiesta HTTP e distrutto al suo termine. | Elaborazione di singoli task, form submission, gestione parametri di una singola request. |
| **`@SessionScoped`** | Il bean sopravvive per l'intera durata della sessione utente (HTTP Session). | Carrello della spesa, profilo utente autenticato, stato persistente di navigazione. |
| **`@ApplicationScoped`** | Esiste una sola istanza del bean per tutta l'applicazione (simile a un Singleton). | Cache applicativa, configurazioni globali condivise, contatori di sistema. |
| **`@ConversationScoped`** | Permette di mantenere lo stato per un numero predefinito di richieste consecutive. | Form multi-pagina, wizard a step, transazioni lunghe controllate programmaticamente. |

---

## 5.2 Java Persistence API (JPA)

La **Java Persistence API (JPA)** è la specifica Java per la gestione della persistenza dei dati relazionali in applicazioni Enterprise. JPA utilizza il paradigma dell'**Object-Relational Mapping (ORM)** per mappare le classi Java (Entity) sulle tabelle del database relazionale, eliminando la necessità di scrivere codice SQL esplicito per le operazioni CRUD di base.

Un'**Entity** è una semplice classe Java annotata con **`@Entity`**. Ogni istanza di un'Entity corrisponde a una riga nella tabella del database. La chiave primaria viene definita tramite l'annotazione **`@Id`**.

### Definizione di un'Entità (`Studente.java`)

```java
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;

@Entity
public class Studente {
    @Id
    @GeneratedValue
    private Long id;
    private String nome;
    private String matricola;

    // Costruttore vuoto richiesto da JPA
    public Studente() {}

    // Getter e Setter...
    public Long getId() { 
        return id; 
    }
    public void setId(Long id) { 
        this.id = id; 
    }
    public String getNome() { 
        return nome; 
    }
    public void setNome(String nome) { 
        this.nome = nome; 
    }
    public String getMatricola() { 
        return matricola; 
    }
    public void setMatricola(String matricola) { 
        this.matricola = matricola; 
    }
}
```

### Interazione tramite `EntityManager` (`StudenteDao.java`)

L'entità centrale per interagire con il database è l'**`EntityManager`**. L'`EntityManager` gestisce il ciclo di vita delle Entity (contesto di persistenza) e offre metodi come `persist()` per l'inserimento, `find()` per la ricerca e `remove()` per la cancellazione.

```java
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ejb.Stateless;

@Stateless
public class StudenteDao {

    @PersistenceContext
    private EntityManager em;

    public void salvaStudente(Studente s) {
        em.persist(s); // Salva l'oggetto nel database
    }

    public Studente trovaStudente(Long id) {
        return em.find(Studente.class, id); // Ricerca per Primary Key
    }

    public void eliminaStudente(Studente s) {
        em.remove(em.merge(s)); // Rimuove l'entità dal database
    }
}
```

### Ciclo di Vita e Stati delle Entità JPA

| Stato dell'Entità | Descrizione Operativa | Metodi di Transizione |
| :--- | :--- | :--- |
| **New (Transient)** | L'oggetto è stato creato in memoria con `new` ma non è ancora associato al Database né tracciato dall'`EntityManager`. | `em.persist(e)` $\to$ **Managed** |
| **Managed** | L'entità è attivamente tracciata dal contesto di persistenza. Ogni modifica ai campi viene sincronizzata automaticamente con il DB al commit o al `flush()`. | `em.detach(e)` $\to$ **Detached**<br>`em.remove(e)` $\to$ **Removed** |
| **Detached** | L'entità rappresenta un record esistente nel DB ma non è più monitorata (es. dopo `em.detach()`, `em.clear()` o chiusura della transazione). | `em.merge(e)` $\to$ **Managed** |
| **Removed** | L'entità è marcata per essere eliminata dal DB al termine della transazione (`DELETE`). | `em.persist(e)` $\to$ **Managed** |

---

> [!TIP]
> ### In breve: Java EE, CDI e JPA
> * **Il Container (Il direttore d'orchestra):** In Java EE non scrivi tutto da zero. Tu scrivi solo i piccoli "mattoncini" (Componenti), poi c'è un grosso software chiamato Container (Application Server) che li prende, li fa girare, gestisce la loro memoria, la loro sicurezza e li fa parlare tra di loro.
> * **CDI (`@Inject`):** Perché creare gli oggetti a mano con `new` se può farlo il Container? Con l'annotazione `@Inject`, tu dici al Container: "Ehi, qui mi serve l'oggetto X", e il Container te lo fa trovare pronto all'uso. Gli Scope (`@RequestScoped`, ecc.) decidono quanto a lungo vivrà questo oggetto.
> * **JPA (`@Entity`):** Invece di impazzire con le query SQL, dici a Java che una certa classe è un'`@Entity`. Da quel momento, Java capisce che quella classe corrisponde a una tabella nel Database, e potrai salvare interi oggetti usando l'`EntityManager` in modo automatico (ORM).

---

## 5.3 Enterprise JavaBeans (EJB)

Gli **Enterprise JavaBeans (EJB)** sono i componenti lato server di Java EE deputati a incapsulare la logica di business di un'applicazione. Il container EJB fornisce servizi di sistema essenziali come la gestione delle transazioni, la sicurezza, la concorrenza e il pooling delle istanze, permettendo allo sviluppatore di concentrarsi esclusivamente sulla logica applicativa.

### Tassonomia degli EJB

Gli EJB si dividono principalmente in due macro-categorie:

1. **Session Beans:** eseguono un task per un client specifico. Possono essere:
   * **Stateless (`@Stateless`):** non mantengono alcuno stato conversazionale con il client. Sono estremamente efficienti e il container li gestisce tramite un pool di istanze interscambiabili.
   * **Stateful (`@Stateful`):** mantengono lo stato della conversazione con il client per tutta la durata della sessione (es. un carrello della spesa).
   * **Singleton (`@Singleton`):** istanziati una sola volta per applicazione, utilizzati per condividere dati globali o gestire task concorrenti centralizzati.
2. **Message-Driven Beans (MDB):** componenti asincroni che si attivano unicamente alla ricezione di un messaggio tramite JMS (Java Message Service), annotati con **`@MessageDriven`**.

| Tipologia EJB | Annotazione | Caratteristiche & Ciclo di Vita | Caso d'Uso Principale |
| :--- | :--- | :--- | :--- |
| **Stateless Session Bean** | `@Stateless` | Nessuno stato conversazionale tra le chiamate. Le istanze sono condivise in un pool per la massima scalabilità. | Operazioni di calcolo, servizi di business stateless, DAO. |
| **Stateful Session Bean** | `@Stateful` | Mantiene lo stato della sessione dedicato al singolo client per tutta la durata della conversazione. | Sessione carrello e-commerce, wizard transazionali a più step. |
| **Singleton Session Bean** | `@Singleton` | Un'unica istanza globale condivisa da tutti i client per l'intera applicazione. | Cache applicativa condivisa, configurazioni runtime, contatori. |
| **Message-Driven Bean** | `@MessageDriven` | Elaborazione asincrona guidata da messaggi JMS (in ascolto su code o topic). Non accessibile direttamente da client. | Ricezione ed elaborazione di code messaggi asincrone. |

---

## 5.4 Java Message Service (JMS)

Il **Java Message Service (JMS)** è l'API standard di Java EE per la messaggistica asincrona. Permette a componenti distribuiti di comunicare in modo debolmente accoppiato e affidabile, inviando e ricevendo messaggi.

### Modelli di Comunicazione JMS

JMS supporta due modelli di comunicazione principali:

1. **Point-to-Point (Code):** un messaggio inviato a una coda (*Queue*) viene consumato da un solo ricevitore. Se il ricevitore è offline, il messaggio viene conservato finché non torna disponibile.
2. **Publish/Subscribe (Topic):** un messaggio inviato a un *Topic* viene ricevuto da tutti i sottoscrittori (*Subscriber*) attivi in quel momento, permettendo il broadcast delle informazioni.

| Modello JMS | Destinazione | Modalità di Consegna | Comportamento del Ricevitore | Gestione Offline |
| :--- | :--- | :--- | :--- | :--- |
| **Point-to-Point (Queue)** | Coda (`Queue`) | 1-a-1 (Singolo Ricevitore) | Il messaggio inviato alla coda viene prelevato ed elaborato da un solo consumatore. | Il messaggio viene conservato nella coda finché il ricevitore non torna online. |
| **Publish/Subscribe (Topic)** | Argomento (`Topic`) | 1-a-Molti (Broadcast) | Il messaggio inviato al Topic viene consegnato a tutti i sottoscrittori attivi contemporaneamente. | Il messaggio viene ricevuto solo dai subscriber attivi al momento dell'invio (salvo *durable subscription*). |

---

## 5.5 SOAP Web Services

Oltre ai classici componenti distribuiti, Java EE permette di esporre e invocare servizi tramite **Web Services**. L'invocazione di un SOAP WS è molto simile all'invocazione di un oggetto distribuito con RMI: si ottiene il riferimento al servizio e si invocano metodi su di esso. Precisamente, ne viene ottenuto un **proxy**, il quale permette di effettuare chiamate anche su web service non scritti in Java tramite dei tool interni.

Innanzitutto, per invocare un WS SOAP si necessita di un **consumer**, il che non è altro che un client sulla JVM capace di comunicare con le componenti di un container.

### Invocazione di un SOAP WS all'interno del Container

Nel caso il consumer si trovi in un container, quest'ultimo può ottenere un'istanza del proxy direttamente tramite iniezione: per iniettare un SOAP WS, è necessario utilizzare l'annotazione **`@WebServiceRef`** o un producer dedicato.

```java
import javax.xml.ws.WebServiceRef;

public class OrdineController {

    @WebServiceRef
    private static FatturaWebServiceService service;

    public void emettiFattura() {
        FatturaWebService port = service.getFatturaWebServicePort();
        port.creaFattura("ORD-98765");
    }
}
```

### 5.5.1 Invocazione di un SOAP WS fuori dal Container

Se il consumer è un client posto al di fuori di un container, è necessario invocare il SOAP WS programmaticamente. Non si utilizzerà il web service direttamente, bensì un suo proxy generato.

Sia `WSNAME` il nome del web service, tale proxy si ricava tramite la seguente istruzione:

```java
WSNAME port = new WSNAMEService().getWSNAMEPort();
```

> [!NOTE]
> **Nota bene:** alcune volte `WSNAME` e `Service()` sono separati da un underscore (es. `WSNAME_Service`). Ciò accade quando `WSNAME` si conclude con il carattere “s”.

Ricavato il proxy del web service, è possibile effettuare invocazioni di metodi, le quali saranno delegate al web service remoto. Ciò che sta dietro l'invocazione remota fa parte del meccanismo nascosto offerto dal proxy.

---

> [!TIP]
> ### In breve: EJB, Messaggi e Web Services
> * **EJB (I lavoratori pesanti):** Se la logica della tua app è complessa, usi gli EJB. Gli *Stateless* sono come sportelli del bancomat (fai l'operazione e via, non si ricordano di te), gli *Stateful* sono come un carrello della spesa che ti segue mentre navighi, e i *Singleton* sono come l'orologio centrale della banca.
> * **JMS (Poste asincrone):** A volte non puoi aspettare una risposta immediata. Con JMS spedisci un messaggio e te ne vai. La coda (*Point-to-Point*) garantisce che il messaggio arrivi a un solo destinatario. Il Topic (*Publish/Subscribe*) funziona come un megafono: chiunque è sintonizzato ascolta.
> * **SOAP Web Services (Il Proxy magico):** Invocare un servizio SOAP è facile quasi quanto RMI. Se sei dentro il Container, usi `@WebServiceRef` e fa tutto lui. Se sei fuori, devi creare a mano un "Proxy" (un finto oggetto locale che inoltra tutto in rete) usando la formula `new NomeServizio().get...Port()`. Una volta ottenuto il Proxy, chiami i metodi e la magia avviene dietro le quinte!
